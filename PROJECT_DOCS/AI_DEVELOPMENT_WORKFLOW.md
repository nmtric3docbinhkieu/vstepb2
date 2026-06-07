# AI_DEVELOPMENT_WORKFLOW.md

# AI DEVELOPMENT WORKFLOW

Version 1.0

Purpose:

Kiểm soát hành vi của AI Agent trong toàn bộ vòng đời dự án.

Áp dụng cho:

* Github Copilot Agent
* Windsurf Cascade
* Cursor Agent
* Claude Code
* OpenAI Codex
* Bất kỳ AI coding assistant nào

---

# CORE PRINCIPLE

AI không phải người viết code.

AI là thành viên trong team.

AI phải tuân thủ quy trình phát triển phần mềm.

AI không được tự ý quyết định kiến trúc.

AI không được tự ý thay đổi roadmap.

---

# PHASE LOCK SYSTEM

Dự án được chia thành Phase.

AI chỉ được làm việc trong Phase hiện tại.

Ví dụ:

Current Phase:

PHASE 3

AI TUTOR

AI KHÔNG ĐƯỢC:

* Làm Speaking
* Làm Writing
* Làm Vocabulary

Cho đến khi Phase 3 hoàn tất.

---

# COMPLETION RULE

Một phase chỉ được coi là hoàn thành khi:

1. Build thành công
2. Không lỗi TypeScript
3. Không lỗi ESLint
4. Không lỗi Runtime
5. Deploy thành công
6. User xác nhận hoạt động

Nếu thiếu bất kỳ điều kiện nào:

Phase chưa hoàn thành.

---

# REQUEST ANALYSIS RULE

Trước khi code:

AI phải phân tích:

1. Yêu cầu thuộc phase nào
2. Tác động tới module nào
3. Có phụ thuộc module khác không
4. Có rủi ro gì không

Sau đó mới đề xuất giải pháp.

AI không được code ngay lập tức.

---

# SMALL TASK RULE

Mỗi lần chỉ xử lý:

1 task

hoặc

1 subtask.

Ví dụ:

ĐÚNG

Task:

Tạo Login Page

SAI

Task:

Tạo Login
Tạo Dashboard
Tạo AI Chat
Tạo MongoDB

cùng lúc.

---

# FILE MODIFICATION RULE

AI phải liệt kê trước:

Files Created

Files Updated

Files Deleted

trước khi sinh code.

---

# SAFE REFACTOR RULE

AI không được refactor toàn bộ hệ thống.

AI chỉ được refactor khi:

* User yêu cầu
* Có bug nghiêm trọng
* Có bằng chứng kỹ thuật rõ ràng

Nếu không:

Không được refactor.

---

# DATABASE RULE

MongoDB Atlas

ORM:

Mongoose

AI phải:

* Reuse collections hiện có
* Tránh tạo collection mới

Mỗi collection mới phải có lý do rõ ràng.

---

# API RULE

Mọi API phải:

* Validate input
* Return typed response
* Handle errors

Format:

{
success: boolean,
message: string,
data: object | null,
error: string | null
}

---

# OPENAI RULE

Không gọi OpenAI trực tiếp từ UI.

Luôn thông qua:

AI Service Layer

Ví dụ:

services/ai/openai.ts

---

# TEST FIRST RULE

Sau mỗi task:

AI phải sinh:

TEST CHECKLIST

Ví dụ:

□ Build thành công

□ Login hoạt động

□ Không lỗi console

□ Không lỗi network

□ Deploy thành công

---

# DOCUMENTATION RULE

Sau mỗi task:

AI phải cập nhật:

TASK_BOARD.md

Ví dụ:

[✓] Login Page

Status:

Completed

---

# STOP RULE

AI phải dừng lại nếu:

* Scope quá lớn
* Yêu cầu mơ hồ
* Thiếu thông tin

AI phải hỏi lại.

Không được tự suy diễn.

---

# BUG FIX RULE

Khi sửa bug:

AI phải:

1. Xác định nguyên nhân
2. Giải thích nguyên nhân
3. Đề xuất cách sửa
4. Chỉ sửa phần liên quan

Không được viết lại module.

---

# DEPLOY RULE

Mọi feature phải chạy được trên:

* localhost

và

* Vercel

AI phải tránh:

* thư viện không tương thích Vercel
* package quá nặng
* dependency lỗi thời

---

# COST CONTROL RULE

Dự án ưu tiên chi phí thấp.

AI phải ưu tiên:

Free Tier

Ví dụ:

Database:

MongoDB Atlas

Authentication:

JWT Session

Storage:

Cloudinary Free
hoặc
Vercel Blob

Monitoring:

Built-in Logs

---

# MVP FIRST RULE

Luôn làm:

Version đơn giản nhất trước.

Ví dụ:

Speaking Module

Version 1:

Record Audio

Version 2:

Speech To Text

Version 3:

AI Evaluation

Version 4:

Pronunciation Analysis

Không được làm Version 4 trước.

---

# GOLDEN COMMAND

Nếu xuất hiện nhiều lựa chọn:

AI phải chọn phương án:

Đơn giản nhất
Ít rủi ro nhất
Dễ bảo trì nhất
Chi phí thấp nhất

thay vì

Phức tạp nhất
Hiện đại nhất
Nhiều tính năng nhất

---

# FINAL PRINCIPLE

Một module được deploy thành công

quan trọng hơn

mười module đang phát triển dang dở.

AI phải ưu tiên:

Completion Over Complexity.
