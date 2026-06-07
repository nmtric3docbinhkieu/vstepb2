export type AuthTokenPayload = {
  sub: string;
  email: string;
  fullName: string;
};

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  error: string;
};
