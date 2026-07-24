# LLM-Guard Go API

This directory contains the Go API gateway for LLM-Guard. It is my part of the project.

## What is working now

The backend accepts a prompt from a client, validates it, sends it to a local Ollama model, and returns only the generated answer.

```text
Postman or frontend
        |
        | POST /chat
        v
Go API server
        |
        | creates the Ollama request automatically
        v
Local Ollama model
        |
        v
Go API returns a clean answer
```

The client calls the Go API only. It does not need to know Ollama's URL, model name, or response format.

## Implemented features

- Go HTTP server using Echo
- `GET /health` endpoint
- `POST /chat` endpoint
- JSON request parsing and validation
- Blank-prompt validation
- Maximum prompt length of 10,000 characters
- Go-to-Ollama HTTP connection
- 30-second Ollama request timeout
- Clean response format that returns only the AI answer
- Automated tests for health checks, valid prompts, and blank prompts

## Run locally

With the required local services running, start the Go API:

```bash
go run .
```

## Current API endpoints

### Health check

```text
GET /health
```

Response:

```text
ok
```

### Chat proxy

```text
POST /chat
```

Request:

```json
{
  "prompt": "Say hello in one sentence."
}
```

Response:

```json
{
  "answer": "Hello! How can I assist you today?"
}
```

## Tests

```bash
go test ./...
go vet ./...
```

The tests use a fake Ollama service, so they do not require the real model to be running.

## Planned API updates

These are API integration tasks that will be added later:

1. Call the AI/security service before forwarding a prompt to Ollama.
2. Block unsafe prompts based on the AI/security service's response.
3. Send Ollama output to the AI/security service for output validation.
4. Return a masked or blocked response when output is unsafe.
5. Save security events through the database integration when a prompt or output is blocked.
6. Add an API endpoint to read security events for the future dashboard.
7. Replace the learning route `/chat` with the final versioned API route.
8. Add frontend-specific configuration such as CORS when frontend integration begins.
