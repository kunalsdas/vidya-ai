# Vidya — AI Knowledge Companion

Vidya transforms any textbook into an interactive learning experience. Instead of jumping between YouTube, Google, and PDFs, students get everything in one place — powered by Amazon Nova.

## What it does

Enter any subject and book. Vidya uses Nova to extract every chapter and topic, then gives you 7 ways to learn each one:

- **Deep Concept** — First-principles explanations with live concept networks
- **Quick Revision** — Sharp notes in seconds
- **Exam Mode** — What examiners actually test
- **Knowledge Graph** — See how concepts connect visually (D3.js)
- **Questions** — MCQs, short answers, long answers
- **Reels** — 60-second bite-sized learning cards
- **Battle** — Quiz yourself against AI

Plus two more tools:
- **Scan Page** — Photograph any textbook page or handwritten notes. Nova Vision reads and explains it instantly.
- **Focus Mode** — Gamified Pomodoro timer with anti-sleep detection

## Amazon Nova Models Used

- **Nova Lite** — Content generation, doubt resolution, reels, battle questions, knowledge graphs
- **Nova Embed** — Semantic search and topic similarity for the knowledge graph
- **Nova Vision** — Document and image analysis for Scan Page

## Tech Stack

- **Backend:** Python, FastAPI
- **Frontend:** Vanilla JavaScript, D3.js, KaTeX
- **Deployment:** Render.com

## Setup

1. Clone the repo
2. Copy `.env.example` to `.env` and add your Nova API key
3. Install dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```
4. Run the server:
   ```
   uvicorn main:app --reload
   ```
5. Open `http://localhost:8000`

## Project Structure

```
backend/
  main.py            — FastAPI app
  models.py          — Pydantic models
  nova_client.py     — Amazon Nova API client
  agents/            — AI agents (content, doubt, knowledge graph, etc.)
  prompts/           — Prompt templates for each feature
  routes/            — API endpoints

frontend/
  index.html
  static/
    js/              — 11 modules (app, api, vision, gamification, etc.)
    css/             — 16 stylesheets split by feature
```

## Why we built this

Students don't fail because information is missing — they fail because there's too much of it. Coaching centers rush through syllabi and leave slow learners behind. YouTube "study sessions" turn into 3-hour doom scrolls. Vidya is built for how students actually learn in 2026 — short bursts, visual connections, and instant answers.

## Live Demo

https://vidya-ai.onrender.com

(First load may take 30-60 seconds — free tier cold start)
