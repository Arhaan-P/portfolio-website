# Queez

## One-liner
A cross-platform learning app (Flutter + FastAPI) where students take quizzes/flashcards solo or in real-time multiplayer sessions, with AI turning uploaded documents (PDF/PPT/Word) into ready-made study material.

## Problem/Motivation
Targets passive, isolated studying: static notes and single-purpose apps (Kahoot for live quizzes, Quizlet for flashcards) don't combine active recall, gamified competition, and content creation in one place. Queez bundles quiz builder, flashcards, rich-text notes, and live multiplayer sessions into one app, and uses AI to cut the time needed to turn source documents into quizzes/flashcards/notes.

## My Role
Team project (2 repos: `Queez-Frontend`, `Queez-Backend`), not solo. Commit authorship (excluding a stray "Your Name" placeholder identity that's likely a misconfigured local git author, not a separate person):

- **Backend:** Arhaan-P — 51 commits (dominant/primary author), Krish Chauhan — 1 commit
- **Frontend:** Arhaan-P — 131 commits (+1 under a second "Arhaan" alias) (primary author), Aditya Bharti — 21 commits, Krish Chauhan — 3 commits, prax860 — 3 commits

Arhaan-P (this user) is the primary owner of both the backend API and the majority of frontend features, with contributions from 2-3 collaborators on the Flutter app.

## Tech Stack

**Languages:** Python 3.11, Dart (^3.10.0)

**Frameworks/Libraries:**
- Backend: FastAPI, Motor (async MongoDB driver), python-socketio/websockets, Pydantic, google-genai (Gemini SDK), firebase-admin, google-api-python-client (Drive API)
- Frontend: Flutter 3.38.3, Riverpod (state mgmt), Freezed + json_serializable (codegen data models), flutter_quill (rich text notes editor), flutter_card_swiper, qr_flutter, share_plus, image_picker/file_picker, web_socket_channel

**Database:** MongoDB Atlas (primary store — quizzes, sessions, attempts, users, reviews, results, tags), Redis (ephemeral live-session state, distributed locks, leaderboard caching), Firebase Cloud Firestore (used from the Flutter client for auth-adjacent/user profile data)

**Cloud/Infra:** Render.com (FastAPI hosting), MongoDB Atlas, Redis Cloud/Upstash (TLS `rediss://` in use), Firebase Auth, Google Drive API (service-account-based video/file storage), Google Gemini API (content generation)

**DevOps/Tools:** Docker (backend Dockerfile), `render.yaml` for Render deploy config, GitHub Actions (Android APK build + release workflow on frontend repo)

## Key Features
- Multi-format content creation: single/multi-select MCQ, true/false, drag-and-drop matching questions, flashcard sets, and a rich-text notes editor, bundled into shareable "study sets" / "course packs"
- AI-powered generation: upload a PDF/PPTX/DOCX/TXT and Gemini auto-generates quizzes, flashcards, and notes from it (via a secured resumable upload flow that keeps the Gemini API key server-side)
- Real-time multiplayer quiz sessions over WebSockets with join codes/QR codes, live leaderboards, host controls (start/pause/end), and reconnection support
- Speed- and streak-based scoring engine: time-decayed point multiplier, per-answer partial credit for multi-select questions, and a capped streak bonus (10%/correct answer, max 50%)
- Course-pack marketplace: users can list packs publicly and other users can claim them into their own library
- Cross-platform Flutter client: Android, iOS, Web, Windows, macOS, Linux from one codebase

## Architecture Notes
Three-tier: Flutter client → FastAPI backend (REST for CRUD, WebSockets for live multiplayer/AI progress) → MongoDB (persistent data) + Redis (live session state/locks/cache) + Firebase (auth) + Gemini/Drive (AI + media). Backend routes are split by domain (`quizzes`, `flashcards`, `notes`, `course_pack`, `ai_generation`, `live_multiplayer`, `websocket`, `leaderboard`, etc.), with dedicated service classes (`GameController`, `LeaderboardManager`, `ConnectionManager`, `SessionManager`) encapsulating multiplayer/session logic. Frontend follows a widgets/providers/services separation with Riverpod.

## Technical Challenges Solved
- **Race-condition-safe scoring:** answer submission uses per-user Redis locks (`lock:answer:*`) plus a session-wide participants lock (`lock:participants:*`) with retry/backoff to prevent concurrent answers from clobbering shared session state — explicitly called out in code comments as a fix for a real race condition.
- **Anti-cheat timestamp validation:** server clamps/validates client-reported answer timing (rejects negative values, floors suspiciously fast (<0.5s) answers, caps at the question time limit) before computing time-based bonus points, plus a max-score ceiling to block integer-overflow style exploits.
- **Read-through caching for hot quiz data:** live sessions cache the active quiz's questions in Redis (1-hour TTL) to avoid re-hitting MongoDB on every answer/question-fetch during a session.
- **Partial-credit scoring for multi-select questions:** computes credit as `(correct_selections - wrong_selections) / total_correct`, clamped to [0, 1], rather than simple exact-match scoring.
- **Dual real-time/persistent split:** deliberately keeps ephemeral, high-churn session state (scores, current question index, connection status) in Redis while durable content lives in MongoDB, avoiding heavy DB writes during live gameplay.

## Metrics/Impact
No quantified metrics found (no test coverage numbers, load benchmarks, or user counts in the codebase) — consider adding benchmarks (e.g., WebSocket concurrent-session load test results, Gemini generation latency) if available. Note: no automated test suite exists in either repo (only a manual `dev_tools/bot_tester.py` script in the backend) — worth mentioning if a portfolio reviewer asks about testing rigor.

## Live Demo / Repo Link
- Backend repo: https://github.com/ABBEY-ANYTHING/Queez-Backend
- Frontend repo: https://github.com/ABBEY-ANYTHING/QUEEZ
- Live backend API: https://queez-backend.onrender.com (per README; API docs at `/docs`)
- App demo/download: [ADD LINK]

## Screenshots Needed
Yes — this is a full mobile/desktop UI app (quiz-taking, flashcard swiping, live multiplayer leaderboards, notes editor, library) and would benefit strongly from screenshots or a short demo video/GIF of a live multiplayer session.

## Suggested Portfolio Tier
**Featured** — full-stack, multi-repo project with real-time WebSocket architecture, a non-trivial distributed-locking scoring engine, third-party AI integration (Gemini), and genuine team collaboration under your primary ownership; strong candidate for a detailed case study rather than a grid listing.
