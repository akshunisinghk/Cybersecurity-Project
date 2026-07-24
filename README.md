# LLM Guard Cybersecurity Project

## Overview

An AI-powered cybersecurity application that protects Large Language Models (LLMs) from prompt injection and jailbreak attacks before forwarding safe requests to the AI model.

---

## Features

- Prompt Injection Detection
- Jailbreak Detection
- Prompt Sanitization
- AI-powered Security Analysis
- Risk Score Generation
- Decision Engine (ALLOW / BLOCK / WARN)
- Secure Prompt Forwarding
- Go Backend Integration
- Ollama Integration
- REST API

---

## Architecture

Frontend
    │
    ▼
Go Backend
    │
    ▼
LLM Guard
    │
 ┌──┴───────────────┐
 │                  │
 ▼                  ▼
Prompt Injection   Jailbreak Detection
Detection
        │
        ▼
 AI Security Analysis
        │
        ▼
 Risk Score
        │
   ┌────┴────┐
   │         │
 BLOCK     ALLOW
   │         │
403 Error   Ollama
               │
               ▼
        AI Response

---

## Tech Stack

### Backend
- Go
- Echo Framework

### Security Service
- Python
- FastAPI

### AI
- Ollama

### Frontend
- React

---

## Project Structure

```
Cybersecurity-Project/
├── llm-guard-backend/
├── llm-guard-frontend/
└── llmguard-ai-security/
```

---

## API Flow

1. User submits a prompt.
2. Go Backend forwards it to LLM Guard.
3. LLM Guard analyzes the prompt.
4. If malicious → BLOCK.
5. If safe → Sanitized prompt is sent to Ollama.
6. AI response is returned.

---

## Security Checks

- Prompt Injection
- Jailbreak Detection
- Prompt Sanitization
- Risk Scoring
- Decision Engine

---

## Current Status

- Backend Integration ✅
- LLM Guard Integration ✅
- End-to-End Testing ✅
- GitHub Integration ✅
