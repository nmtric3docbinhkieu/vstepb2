# CODEBASE_STANDARDS.md

# CODEBASE STANDARDS

Version 1.0

Purpose:

Định nghĩa tiêu chuẩn code cho toàn bộ hệ thống.

Mọi AI Agent phải tuân thủ tuyệt đối.

---

# GENERAL PRINCIPLE

Code phải:

* Dễ đọc
* Dễ sửa
* Dễ mở rộng

Ưu tiên:

Readability > Cleverness

Không viết code quá thông minh.

---

# LANGUAGE

Frontend:

TypeScript

Backend:

TypeScript

Không sử dụng JavaScript thuần.

---

# FOLDER STRUCTURE

src/

app/

components/

features/

services/

lib/

hooks/

types/

schemas/

constants/

utils/

store/

---

# FEATURE MODULE RULE

Mỗi tính năng phải tách module.

Ví dụ:

features/

writing/

speaking/

reading/

vocabulary/

dashboard/

auth/

---

# COMPONENT RULE

Một component:

≤ 300 dòng

Nếu vượt:

Tách component.

---

# FUNCTION RULE

Một function:

≤ 50 dòng

Nếu dài hơn:

Refactor thành function nhỏ hơn.

---

# FILE SIZE RULE

Một file:

≤ 500 dòng

Nếu lớn hơn:

Chia nhỏ.

---

# NAMING RULE

Component:

PascalCase

Ví dụ:

WritingEditor.tsx

SpeakingRecorder.tsx

StudyPlanCard.tsx

---

# FUNCTION NAME RULE

camelCase

Ví dụ:

calculateScore()

generateFeedback()

saveEssay()

---

# VARIABLE RULE

camelCase

Ví dụ:

studentLevel

essayText

writingScore

---

# CONSTANT RULE

UPPER_SNAKE_CASE

Ví dụ:

MAX_WRITING_LENGTH

MAX_PROMPT_COUNT

FREE_PLAN_LIMIT

---

# TYPE RULE

Tất cả object phải có Type.

Không dùng any.

Sai:

const data: any

Đúng:

const data: WritingResult

---

# INTERFACE RULE

Ưu tiên:

type

Ví dụ:

type UserProfile = {
id: string
name: string
}

---

# IMPORT RULE

Thứ tự:

1. React
2. External libraries
3. Internal modules
4. Relative imports

---

# API STRUCTURE

/api

/auth

/writing

/speaking

/reading

/vocabulary

/admin

---

# API RESPONSE FORMAT

Success

{
success: true,
message: "Success",
data: {}
}

Error

{
success: false,
message: "Failed",
error: "ERROR_CODE"
}

Không được dùng format khác.

---

# ERROR HANDLING RULE

Mọi API phải:

try/catch

Ví dụ:

try {

}

catch(error) {

}

Không bỏ qua lỗi.

---

# LOGGING RULE

Server:

console.error()

Client:

toast()

Không được để lỗi im lặng.

---

# DATABASE RULE

MongoDB Atlas

ODM:

Mongoose

---

# COLLECTION NAMING

lowercase_plural

Ví dụ:

users

essays

writing_results

study_plans

vocabulary_words

speaking_results

---

# SCHEMA RULE

Mọi collection phải có:

createdAt

updatedAt

---

# INDEX RULE

Field tìm kiếm thường xuyên:

phải tạo index.

Ví dụ:

email

userId

examDate

---

# AUTH RULE

JWT

HttpOnly Cookie

Không lưu token trong localStorage.

---

# SECURITY RULE

Validate toàn bộ input.

Không tin dữ liệu từ client.

---

# FORM VALIDATION

Sử dụng:

Zod

Không validate thủ công.

---

# ENV RULE

Mọi secret:

.env.local

Không hardcode API Key.

---

# OPENAI RULE

OpenAI Key

chỉ tồn tại ở backend.

Không đưa sang frontend.

---

# PROMPT RULE

Prompt phải lưu trong:

src/prompts

Không hardcode trong component.

---

# AI SERVICE RULE

Tất cả AI request:

services/ai/

Ví dụ:

services/ai/openai.ts

services/ai/scoring.ts

services/ai/feedback.ts

---

# TESTING RULE

Mọi feature mới phải có:

Manual Test Checklist

Ví dụ:

□ Login thành công

□ Logout thành công

□ Refresh không mất session

□ Deploy không lỗi

---

# UI RULE

Sử dụng:

shadcn/ui

Tailwind CSS

Không tự tạo component khi đã có trong shadcn.

---

# DESIGN RULE

Ưu tiên:

Đơn giản

Nhất quán

Dễ dùng

Không ưu tiên hiệu ứng.

---

# ACCESSIBILITY RULE

Mọi button:

có label rõ ràng.

Mọi form:

có validation message.

---

# PERFORMANCE RULE

Không fetch dữ liệu thừa.

Không render lại không cần thiết.

---

# DOCUMENTATION RULE

Mọi module mới:

cập nhật

TASK_BOARD.md

và

ARCHITECTURE.md

nếu cần.

---

# GIT RULE

Commit format:

feat:

fix:

refactor:

docs:

test:

chore:

Ví dụ:

feat: add writing evaluation service

fix: resolve mongodb connection issue

---

# AI AGENT FINAL CHECKLIST

Trước khi hoàn thành task:

□ Build thành công

□ Không lỗi TypeScript

□ Không lỗi ESLint

□ Không lỗi Runtime

□ Đúng Architecture

□ Đúng Product Requirements

□ Đúng Project Rules

□ Đúng Database Schema

□ Cập nhật Task Board

Nếu chưa đủ:

Không được đánh dấu Completed.
