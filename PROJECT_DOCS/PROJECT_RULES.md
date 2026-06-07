# PROJECT_RULES.md

# AI VSTEP PERSONAL COACH

Version: 1.0

---

# MISSION

Xây dựng một hệ thống học và luyện thi VSTEP B2 cá nhân.

Mục tiêu chính:

* Giúp 1 người dùng duy nhất học VSTEP B2.
* Hoạt động trên Vercel.
* Có AI Tutor.
* Có Speaking.
* Có Writing.
* Có Reading.
* Có Listening.
* Có Theo dõi tiến độ.
* Có Dashboard.
* Có Mock Test.

KHÔNG xây dựng sản phẩm thương mại.

KHÔNG tối ưu cho nhiều người dùng.

KHÔNG tối ưu cho hàng nghìn người truy cập.

Ưu tiên:

* Dễ bảo trì.
* Dễ mở rộng.
* Code sạch.
* Chạy ổn định.

---

# AI ROLE

Mỗi lần được yêu cầu code:

AI phải đóng vai:

1. Product Manager
2. Technical Lead
3. Software Architect
4. Senior Full Stack Engineer
5. QA Engineer

AI phải tự đánh giá:

* Có nên làm việc này không?
* Có phụ thuộc module khác không?
* Có làm hỏng kiến trúc hiện tại không?

Nếu có rủi ro:

AI phải dừng lại.

AI phải giải thích trước khi code.

---

# DEVELOPMENT PHILOSOPHY

TUYỆT ĐỐI KHÔNG:

* Sinh toàn bộ dự án trong một lần.
* Sinh hàng trăm file cùng lúc.
* Refactor toàn hệ thống khi chưa cần.
* Thêm tính năng mới khi tính năng cũ chưa ổn định.

BẮT BUỘC:

Mỗi tính năng phải:

1. Thiết kế
2. Code
3. Test
4. Review
5. Deploy
6. Xác nhận hoạt động

sau đó mới được sang tính năng tiếp theo.

---

# TECHNOLOGY STACK

Frontend:

* Next.js App Router
* TypeScript
* TailwindCSS

Backend:

* Next.js Server Actions
* API Routes

Database:

* MongoDB Atlas

ODM:

* Mongoose

Authentication:

* JWT + HttpOnly Cookie

AI:

* OpenAI API

Speech To Text:

* Whisper

Hosting:

* Vercel

State:

* Zustand

Forms:

* React Hook Form

Validation:

* Zod

---

# DATABASE RULE

AI KHÔNG ĐƯỢC:

* Tạo collection dư thừa
* Tạo quan hệ phức tạp

Bắt đầu với ít bảng nhất có thể.

Ví dụ:

users

study_plans

daily_progress

writing_submissions

speaking_submissions

ai_conversations

Chỉ thêm bảng mới khi thực sự cần.

---

# UI RULE

Nguyên tắc:

Simple First.

KHÔNG:

* animation phức tạp
* dashboard rối mắt
* chart không cần thiết

Ưu tiên:

* rõ ràng
* tối giản
* tốc độ

---

# FEATURE ROADMAP

BẮT BUỘC THEO THỨ TỰ

================================

PHASE 0

PROJECT FOUNDATION

================================

Mục tiêu:

Khởi tạo dự án.

Checklist:

* NextJS
* Tailwind
* TypeScript
* ESLint
* Prettier
* Vercel deploy

Definition of Done:

Deploy thành công.

Không lỗi build.

---

PHASE 1

AUTHENTICATION

================================

Mục tiêu:

Đăng nhập.

Chỉ 1 người dùng.

Checklist:

* Login
* Logout
* Protected Route

Definition of Done:

Đăng nhập được.

---

PHASE 2

STUDENT DASHBOARD

================================

Mục tiêu:

Trang chủ.

Hiển thị:

* ngày học
* streak
* tiến độ

Definition of Done:

Dashboard hoạt động.

---

PHASE 3

AI TUTOR CHAT

================================

Mục tiêu:

Tạo gia sư AI.

Chỉ chat text.

Chưa làm voice.

Definition of Done:

Chat ổn định.

Lưu lịch sử.

---

PHASE 4

PLACEMENT TEST

================================

Mục tiêu:

Kiểm tra đầu vào.

Reading

Grammar

Vocabulary

Definition of Done:

Sinh báo cáo trình độ.

---

PHASE 5

STUDY PLAN

================================

Mục tiêu:

Tạo lộ trình 90 ngày.

Definition of Done:

Dashboard hiển thị kế hoạch.

---

PHASE 6

WRITING TRAINER

================================

Mục tiêu:

Luyện Writing.

AI:

* chấm điểm
* sửa lỗi
* cho bài mẫu

Definition of Done:

Chấm được bài viết.

---

PHASE 7

SPEAKING RECORDER

================================

Mục tiêu:

Ghi âm.

Checklist:

* Record
* Upload
* Playback

Definition of Done:

Nghe lại được file.

---

PHASE 8

SPEECH TO TEXT

================================

Whisper Integration

Definition of Done:

Chuyển speech thành text.

---

PHASE 9

SPEAKING EVALUATOR

================================

AI đánh giá:

* Fluency
* Pronunciation
* Grammar
* Vocabulary

Definition of Done:

Có bảng điểm.

---

PHASE 10

VOCABULARY SYSTEM

================================

Spaced Repetition.

Definition of Done:

Tự động ôn tập.

---

PHASE 11

READING TRAINER

================================

Definition of Done:

Có bài đọc.

Có chấm điểm.

---

PHASE 12

LISTENING TRAINER

================================

Definition of Done:

Có audio.

Có câu hỏi.

Có chấm điểm.

---

PHASE 13

MOCK TEST

================================

Thi thử hoàn chỉnh.

Definition of Done:

Thi được 4 kỹ năng.

---

# CODING RULES

Mỗi lần code:

AI phải trả lời:

1. Mục tiêu
2. Rủi ro
3. File cần sửa
4. Kế hoạch

sau đó mới code.

---

# QA RULE

Sau mỗi tính năng:

AI phải tạo:

TEST CHECKLIST

Ví dụ:

□ Login hoạt động

□ Logout hoạt động

□ Không lỗi console

□ Không lỗi build

□ Deploy thành công

---

# STOP RULE

AI phải từ chối thực hiện nếu:

* Một yêu cầu quá lớn
* Nhiều phase bị gộp
* Chưa hoàn thành phase trước

AI phải trả lời:

"Yêu cầu vượt quá phạm vi phase hiện tại.

Đề xuất chia nhỏ thành các task sau..."

---

# GOLDEN RULE

Thà hoàn thành 1 module 100%

hơn là

10 module mỗi cái 20%.

Mọi quyết định kỹ thuật phải tuân thủ nguyên tắc này.
