# DATABASE_SCHEMA.md

Version: 1.0

Database:
MongoDB Atlas

ODM:
Mongoose

---

# DESIGN PRINCIPLES

1. Dễ mở rộng

2. Không lưu dữ liệu dư thừa

3. Có thể mở rộng từ B1 → B2 → C1

4. Có thể thêm nhiều môn học khác

5. Tối ưu Free Tier MongoDB

---

# COLLECTION: users

Purpose:

Thông tin người dùng.

Schema:

{
  _id: ObjectId,

  email: String,

  passwordHash: String,

  fullName: String,

  avatarUrl: String,

  targetLevel: String,

  currentLevel: String,

  createdAt: Date,

  updatedAt: Date
}

Indexes:

email unique

---

# COLLECTION: study_plans

Purpose:

Lộ trình học.

Schema:

{
  _id: ObjectId,

  userId: ObjectId,

  targetExam: "VSTEP_B2",

  durationDays: Number,

  startDate: Date,

  endDate: Date,

  generatedByAI: Boolean,

  createdAt: Date
}

---

# COLLECTION: lessons

Purpose:

Kho bài học.

Schema:

{
  _id: ObjectId,

  title: String,

  category: String,

  level: String,

  lessonType: String,

  content: Mixed,

  createdAt: Date
}

Examples:

Reading

Listening

Vocabulary

Grammar

Writing

Speaking

---

# COLLECTION: vocabulary_words

Schema:

{
  _id: ObjectId,

  word: String,

  ipa: String,

  meaning: String,

  example: String,

  level: String,

  topic: String
}

Indexes:

word

topic

---

# COLLECTION: user_vocabulary_progress

Schema:

{
  _id: ObjectId,

  userId: ObjectId,

  wordId: ObjectId,

  masteryLevel: Number,

  reviewCount: Number,

  lastReviewDate: Date
}

---

# COLLECTION: quizzes

Schema:

{
  _id: ObjectId,

  lessonId: ObjectId,

  title: String,

  questions: Array,

  level: String
}

---

# COLLECTION: quiz_attempts

Schema:

{
  _id: ObjectId,

  userId: ObjectId,

  quizId: ObjectId,

  score: Number,

  answers: Array,

  completedAt: Date
}

---

# COLLECTION: writing_submissions

Schema:

{
  _id: ObjectId,

  userId: ObjectId,

  prompt: String,

  essayText: String,

  aiFeedback: Object,

  estimatedBand: Number,

  submittedAt: Date
}

Example aiFeedback:

{
  grammar: 7,
  vocabulary: 6,
  coherence: 6,
  taskResponse: 7,
  comments: [...]
}

---

# COLLECTION: speaking_submissions

Schema:

{
  _id: ObjectId,

  userId: ObjectId,

  question: String,

  audioUrl: String,

  transcript: String,

  aiFeedback: Object,

  pronunciationScore: Number,

  fluencyScore: Number,

  submittedAt: Date
}

---

# COLLECTION: ai_conversations

Purpose:

Lưu lịch sử trao đổi với gia sư AI.

Schema:

{
  _id: ObjectId,

  userId: ObjectId,

  role: String,

  content: String,

  createdAt: Date
}

---

# COLLECTION: daily_progress

Schema:

{
  _id: ObjectId,

  userId: ObjectId,

  studyMinutes: Number,

  completedLessons: Number,

  completedQuizzes: Number,

  createdAt: Date
}

---

# COLLECTION: achievements

Schema:

{
  _id: ObjectId,

  userId: ObjectId,

  title: String,

  description: String,

  unlockedAt: Date
}

Examples:

7-Day Streak

Vocabulary Master

Writing Warrior

Speaking Hero

---

# FUTURE COLLECTIONS

speaking_live_sessions

mock_tests

exam_results

teacher_feedback

peer_reviews

payment_records

certificate_records