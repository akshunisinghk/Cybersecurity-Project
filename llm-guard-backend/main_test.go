package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/labstack/echo/v4"
)

func TestHealthCheck(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	if err := healthCheck(c); err != nil {
		t.Fatalf("healthCheck returned an error: %v", err)
	}

	if rec.Code != http.StatusOK {
		t.Fatalf("status code = %d, want %d", rec.Code, http.StatusOK)
	}

	if rec.Body.String() != "ok\n" {
		t.Fatalf("response body = %q, want %q", rec.Body.String(), "ok\n")
	}
}

func TestChat(t *testing.T) {

	// Mock Security Service
	security := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		if r.Method != http.MethodPost {
			t.Errorf("method = %s, want %s", r.Method, http.MethodPost)
		}

		if r.URL.Path != "/security-check" {
			t.Errorf("path = %s, want /security-check", r.URL.Path)
		}

		w.Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSON)

		_, _ = w.Write([]byte(`{
			"original_prompt":"Hello",
			"sanitized_prompt":"Hello",
			"decision":"ALLOW",
			"risk_score":0
		}`))
	}))
	defer security.Close()

	// Mock Ollama
	ollama := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		if r.Method != http.MethodPost {
			t.Errorf("method = %s, want %s", r.Method, http.MethodPost)
		}

		if r.URL.Path != "/api/generate" {
			t.Errorf("path = %s, want /api/generate", r.URL.Path)
		}

		w.Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSON)

		_, _ = w.Write([]byte(`{
			"response":"Hello from Ollama",
			"done":true
		}`))
	}))
	defer ollama.Close()

	e := echo.New()

	req := httptest.NewRequest(
		http.MethodPost,
		"/chat",
		strings.NewReader(`{"prompt":"Hello"}`),
	)

	req.Header.Set(
		echo.HeaderContentType,
		echo.MIMEApplicationJSON,
	)

	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	if err := chat(
		newOllamaClient(ollama.URL, "test-model"),
		newSecurityClient(security.URL),
	)(c); err != nil {
		t.Fatalf("chat returned an error: %v", err)
	}

	if rec.Code != http.StatusOK {
		t.Fatalf("status code = %d, want %d", rec.Code, http.StatusOK)
	}

	want := `{"answer":"Hello from Ollama","decision":"ALLOW","risk_score":0,"sanitized_prompt":"Hello","prompt_injection":null,"jailbreak_detection":null,"ai_detection":null}` + "\n"

	if rec.Body.String() != want {
		t.Fatalf("response body = %q, want %q", rec.Body.String(), want)
	}
}

func TestChatRejectsBlankPrompt(t *testing.T) {

	e := echo.New()

	req := httptest.NewRequest(
		http.MethodPost,
		"/chat",
		strings.NewReader(`{"prompt":" "}`),
	)

	req.Header.Set(
		echo.HeaderContentType,
		echo.MIMEApplicationJSON,
	)

	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	e.HTTPErrorHandler(
		chat(
			newOllamaClient("http://127.0.0.1:1", "test-model"),
			newSecurityClient("http://127.0.0.1:1"),
		)(c),
		c,
	)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status code = %d, want %d", rec.Code, http.StatusBadRequest)
	}

	want := `{"message":"prompt is required"}` + "\n"

	if rec.Body.String() != want {
		t.Fatalf("response body = %q, want %q", rec.Body.String(), want)
	}
}
