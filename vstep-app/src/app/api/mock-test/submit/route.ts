import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/constants/auth";
import { verifyAuthToken } from "@/lib/auth";
import { mockTestSubmitSchema } from "@/schemas/mock-test";
import { addMockTestAttempt, listMockTestAttempts } from "@/services/mock-test/attempt-store";
import { evaluateMockTest } from "@/services/mock-test/evaluate-mock-test";
import { MOCK_TEST_MODULE } from "@/services/mock-test/mock-module";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/auth";
import type { MockFinalReport, MockTestAttempt } from "@/types/mock-test";

async function getUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyAuthToken(token);
  return payload?.sub ?? null;
}

export async function GET() {
  const userId = await getUserId();

  if (!userId) {
    const unauthorized: ApiErrorResponse = {
      success: false,
      message: "Unauthorized",
      error: "UNAUTHORIZED",
    };

    return NextResponse.json(unauthorized, { status: 401 });
  }

  const attempts = listMockTestAttempts(userId);

  const response: ApiSuccessResponse<{ attempts: MockTestAttempt[] }> = {
    success: true,
    message: "Mock test attempts loaded",
    data: { attempts },
  };

  return NextResponse.json(response, { status: 200 });
}

export async function POST(request: Request) {
  const userId = await getUserId();

  if (!userId) {
    const unauthorized: ApiErrorResponse = {
      success: false,
      message: "Unauthorized",
      error: "UNAUTHORIZED",
    };

    return NextResponse.json(unauthorized, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = mockTestSubmitSchema.safeParse(body);

    if (!parsed.success) {
      const invalidInput: ApiErrorResponse = {
        success: false,
        message: "Validation failed",
        error: "INVALID_INPUT",
      };

      return NextResponse.json(invalidInput, { status: 400 });
    }

    const report: MockFinalReport = evaluateMockTest({
      module: MOCK_TEST_MODULE,
      submission: parsed.data,
    });

    const attempt = addMockTestAttempt(userId, {
      moduleId: MOCK_TEST_MODULE.id,
      report,
    });

    const response: ApiSuccessResponse<{ attempt: MockTestAttempt; report: MockFinalReport }> = {
      success: true,
      message: "Mock test submitted successfully",
      data: {
        attempt,
        report,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Mock test submit error:", error);

    const failure: ApiErrorResponse = {
      success: false,
      message: "Internal server error",
      error: "INTERNAL_SERVER_ERROR",
    };

    return NextResponse.json(failure, { status: 500 });
  }
}
