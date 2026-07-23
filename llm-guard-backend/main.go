package main

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

const maxPromptLength = 10_000

type config struct {
	ollamaBaseURL string
	ollamaModel   string
}

func main() {
	appConfig, err := loadConfig()
	if err != nil {
		log.Fatal(err)
	}

	e := echo.New()
	e.GET("/health", healthCheck)
	e.POST("/chat", chat(newOllamaClient(appConfig.ollamaBaseURL, appConfig.ollamaModel)))

	server := &http.Server{
		Addr:              ":8080",
		Handler:           e,
		ReadHeaderTimeout: 5 * time.Second,
	}

	log.Println("HTTP server listening on :8080")
	if err := e.StartServer(server); err != nil && err != http.ErrServerClosed {
		log.Fatalf("HTTP server failed: %v", err)
	}
}

func loadConfig() (config, error) {
	if err := godotenv.Load(); err != nil && !errors.Is(err, os.ErrNotExist) {
		return config{}, fmt.Errorf("load .env file: %w", err)
	}

	loadedConfig := config{
		ollamaBaseURL: os.Getenv("OLLAMA_BASE_URL"),
		ollamaModel:   os.Getenv("OLLAMA_MODEL"),
	}

	if strings.TrimSpace(loadedConfig.ollamaBaseURL) == "" {
		return config{}, errors.New("OLLAMA_BASE_URL is required")
	}

	if strings.TrimSpace(loadedConfig.ollamaModel) == "" {
		return config{}, errors.New("OLLAMA_MODEL is required")
	}

	return loadedConfig, nil
}

func healthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "ok\n")
}

type chatRequest struct {
	Prompt string `json:"prompt"`
}

type chatResponse struct {
	Answer string `json:"answer"`
}

type ollamaGenerateRequest struct {
	Model  string `json:"model"`
	Prompt string `json:"prompt"`
	Stream bool   `json:"stream"`
}

type ollamaGenerateResponse struct {
	Response string `json:"response"`
	Done     bool   `json:"done"`
}

type ollamaClient struct {
	baseURL    string
	model      string
	httpClient *http.Client
}

func newOllamaClient(baseURL, model string) *ollamaClient {
	return &ollamaClient{
		baseURL: baseURL,
		model:   model,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

func chat(ollama *ollamaClient) echo.HandlerFunc {
	return func(c echo.Context) error {
		var request chatRequest
		if err := c.Bind(&request); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, "invalid JSON request body")
		}

		if err := validatePrompt(request.Prompt); err != nil {
			return err
		}

		result, err := ollama.generate(c.Request().Context(), request.Prompt)
		if err != nil {
			log.Printf("Ollama generation failed: %v", err)
			return echo.NewHTTPError(http.StatusBadGateway, "LLM service is unavailable")
		}

		return c.JSON(http.StatusOK, chatResponse{Answer: result.Response})
	}
}

func (client *ollamaClient) generate(ctx context.Context, prompt string) (ollamaGenerateResponse, error) {
	body, err := json.Marshal(ollamaGenerateRequest{
		Model:  client.model,
		Prompt: prompt,
		Stream: false,
	})
	if err != nil {
		return ollamaGenerateResponse{}, fmt.Errorf("encode Ollama request: %w", err)
	}

	request, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		client.baseURL+"/api/generate",
		bytes.NewReader(body),
	)
	if err != nil {
		return ollamaGenerateResponse{}, fmt.Errorf("create Ollama request: %w", err)
	}
	request.Header.Set("Content-Type", "application/json")

	response, err := client.httpClient.Do(request)
	if err != nil {
		return ollamaGenerateResponse{}, fmt.Errorf("send Ollama request: %w", err)
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return ollamaGenerateResponse{}, fmt.Errorf("Ollama returned status %d", response.StatusCode)
	}

	var result ollamaGenerateResponse
	if err := json.NewDecoder(response.Body).Decode(&result); err != nil {
		return ollamaGenerateResponse{}, fmt.Errorf("decode Ollama response: %w", err)
	}

	return result, nil
}

func validatePrompt(prompt string) error {
	if strings.TrimSpace(prompt) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "prompt is required")
	}

	if len(prompt) > maxPromptLength {
		return echo.NewHTTPError(http.StatusBadRequest, "prompt is too long")
	}

	return nil
}
