# ARCHITECTURE.md

# SYSTEM ARCHITECTURE

Version 1.0

---

## HIGH LEVEL

Browser

↓

NextJS Frontend

↓

Application Layer

↓

Service Layer

↓

Data Layer

↓

MongoDB Atlas

---

## FRONTEND

Technology:

* NextJS App Router
* TypeScript
* Tailwind
* Zustand

Folders:

src/app

src/components

src/features

src/hooks

src/lib

src/services

src/types

---

## APPLICATION LAYER

Responsibilities:

* Route handling
* Validation
* Authentication
* Error handling

Never:

* Call database directly from UI

---

## AI SERVICE LAYER

Responsibilities:

* OpenAI requests
* Prompt management
* Evaluation logic

Files:

services/ai

services/writing

services/speaking

services/studyplan

---

## DATA LAYER

Responsibilities:

* Database access
* Query abstraction

Files:

repositories

models

---

## DATABASE

MongoDB Atlas

Collections:

users

study_plans

learning_sessions

writing_submissions

speaking_submissions

vocabulary_items

mock_test_results

---

## AUTHENTICATION

Phase 1:

Simple password login.

Single user.

No registration.

No social login.

---

## STORAGE

Audio Files:

Vercel Blob
or
Cloudinary

Không lưu audio vào MongoDB.

---

## AI PROVIDER

Primary:

OpenAI

Future:

Gemini

Claude

Provider phải có abstraction layer.

Không gọi OpenAI trực tiếp trong UI.

---

## ERROR HANDLING

Every API:

Must return

success

message

data

error

format.

---

## LOGGING

Every AI request:

log

timestamp

tokens

response time

cost estimate
