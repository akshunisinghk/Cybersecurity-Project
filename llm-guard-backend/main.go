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
	"github.com/labstack/echo/v4/middleware"
)

const maxPromptLength = 10_000

type config struct {
	ollamaBaseURL string
	ollamaModel   string
	llmGuardURL   string
}

func main() {
	appConfig, err := loadConfig()
	if err != nil {
		log.Fatal(err)
	}

	ollama := newOllamaClient(
		appConfig.ollamaBaseURL,
		appConfig.ollamaModel,
	)

	security := newSecurityClient(
		appConfig.llmGuardURL,
	)

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{
			"http://localhost:5173",
		},
		AllowMethods: []string{
			http.MethodGet,
			http.MethodPost,
			http.MethodPut,
			http.MethodDelete,
			http.MethodOptions,
		},
		AllowHeaders: []string{
			echo.HeaderOrigin,
			echo.HeaderContentType,
			echo.HeaderAccept,
			echo.HeaderAuthorization,
		},
	}))

	e.GET("/health", healthCheck)
	e.GET("/dashboard/stats", dashboardStatsHandler)
	e.GET("/threats", threatsHandler)
	e.GET("/alerts", alertsHandler)
	e.GET("/firewall", firewallHandler)
	e.GET("/dlp", dlpHandler)
	e.GET("/analytics/cards", analyticsCardsHandler)
	e.GET("/analytics/requests", requestsChartHandler)
	e.GET("/analytics/threats", threatPieChartHandler)
	e.GET("/analytics/models", modelUsageChartHandler)
	e.GET("/users", usersHandler)
	e.GET("/models", modelsHandler)
	e.GET("/audit-logs", auditLogsHandler)
	e.GET("/settings", settingsHandler)
	e.POST("/chat", chat(ollama, security))

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
		llmGuardURL:   os.Getenv("LLM_GUARD_URL"),
	}

	if strings.TrimSpace(loadedConfig.ollamaBaseURL) == "" {
		return config{}, errors.New("OLLAMA_BASE_URL is required")
	}

	if strings.TrimSpace(loadedConfig.ollamaModel) == "" {
		return config{}, errors.New("OLLAMA_MODEL is required")
	}

	if strings.TrimSpace(loadedConfig.llmGuardURL) == "" {
		return config{}, errors.New("LLM_GUARD_URL is required")
	}

	return loadedConfig, nil
}

func healthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "ok\n")
}

type dashboardStats struct {
	TotalRequests  int `json:"totalRequests"`
	BlockedPrompts int `json:"blockedPrompts"`
	SafePrompts    int `json:"safePrompts"`
	ActiveModels   int `json:"activeModels"`
}

func dashboardStatsHandler(c echo.Context) error {
	return c.JSON(http.StatusOK, dashboardStats{
		TotalRequests:  1542,
		BlockedPrompts: 87,
		SafePrompts:    1455,
		ActiveModels:   3,
	})
}

type Threat struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Type      string `json:"type"`
	Severity  string `json:"severity"`
	Status    string `json:"status"`
	Timestamp string `json:"timestamp"`
}

func threatsHandler(c echo.Context) error {
	threats := []Threat{
		{
			ID:        1,
			Name:      "Prompt Injection Attack",
			Type:      "Injection",
			Severity:  "High",
			Status:    "Blocked",
			Timestamp: "2026-07-27 19:30",
		},
		{
			ID:        2,
			Name:      "Jailbreak Attempt",
			Type:      "LLM Attack",
			Severity:  "Critical",
			Status:    "Blocked",
			Timestamp: "2026-07-27 19:35",
		},
		{
			ID:        3,
			Name:      "Sensitive Information Exposure",
			Type:      "Data Leakage",
			Severity:  "Medium",
			Status:    "Investigating",
			Timestamp: "2026-07-27 19:42",
		},
		{
			ID:        4,
			Name:      "Malicious Prompt",
			Type:      "Threat Detection",
			Severity:  "High",
			Status:    "Detected",
			Timestamp: "2026-07-27 19:50",
		},
	}

	return c.JSON(http.StatusOK, threats)
}

type Alert struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Severity    string `json:"severity"`
	Status      string `json:"status"`
	Timestamp   string `json:"timestamp"`
}

func alertsHandler(c echo.Context) error {
	alerts := []Alert{
		{
			ID:          1,
			Title:       "Prompt Injection",
			Description: "Prompt injection attack blocked.",
			Severity:    "Critical",
			Status:      "New",
			Timestamp:   "2026-07-26 19:45",
		},
		{
			ID:          2,
			Title:       "PII Detection",
			Description: "Sensitive information detected.",
			Severity:    "High",
			Status:      "Resolved",
			Timestamp:   "2026-07-26 18:30",
		},
		{
			ID:          3,
			Title:       "Jailbreak Attempt",
			Description: "LLM jailbreak attempt blocked.",
			Severity:    "Critical",
			Status:      "Blocked",
			Timestamp:   "2026-07-26 20:15",
		},
		{
			ID:          4,
			Title:       "Malicious Prompt",
			Description: "Suspicious prompt detected.",
			Severity:    "Medium",
			Status:      "Investigating",
			Timestamp:   "2026-07-26 20:40",
		},
	}

	return c.JSON(http.StatusOK, alerts)
}

type FirewallRule struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Type   string `json:"type"`
	Action string `json:"action"`
	Status string `json:"status"`
}

func firewallHandler(c echo.Context) error {
	rules := []FirewallRule{
		{
			ID:     1,
			Name:   "Prompt Injection Protection",
			Type:   "Prompt",
			Action: "Block",
			Status: "Enabled",
		},
		{
			ID:     2,
			Name:   "Sensitive Data Detection",
			Type:   "DLP",
			Action: "Flag",
			Status: "Enabled",
		},
		{
			ID:     3,
			Name:   "SQL Injection Filter",
			Type:   "Input",
			Action: "Block",
			Status: "Enabled",
		},
		{
			ID:     4,
			Name:   "Jailbreak Detection",
			Type:   "Prompt",
			Action: "Block",
			Status: "Disabled",
		},
	}

	return c.JSON(http.StatusOK, rules)
}

type DLPEvent struct {
	ID          int    `json:"id"`
	DataType    string `json:"dataType"`
	Source      string `json:"source"`
	Destination string `json:"destination"`
	Severity    string `json:"severity"`
	Status      string `json:"status"`
}

func dlpHandler(c echo.Context) error {
	events := []DLPEvent{
		{
			ID:          1,
			DataType:    "Email Address",
			Source:      "User Prompt",
			Destination: "External LLM",
			Severity:    "High",
			Status:      "Blocked",
		},
		{
			ID:          2,
			DataType:    "Phone Number",
			Source:      "User Prompt",
			Destination: "External LLM",
			Severity:    "Medium",
			Status:      "Flagged",
		},
		{
			ID:          3,
			DataType:    "API Key",
			Source:      "Application",
			Destination: "External Service",
			Severity:    "High",
			Status:      "Blocked",
		},
		{
			ID:          4,
			DataType:    "Personal Information",
			Source:      "User Prompt",
			Destination: "Internal Model",
			Severity:    "Low",
			Status:      "Allowed",
		},
	}

	return c.JSON(http.StatusOK, events)
}

type AnalyticsCards struct {
	TotalRequests  int    `json:"totalRequests"`
	ThreatsBlocked int    `json:"threatsBlocked"`
	SafePromptRate string `json:"safePromptRate"`
	ActiveModels   int    `json:"activeModels"`
}

func analyticsCardsHandler(c echo.Context) error {
	data := AnalyticsCards{
		TotalRequests:  12548,
		ThreatsBlocked: 342,
		SafePromptRate: "97%",
		ActiveModels:   6,
	}

	return c.JSON(http.StatusOK, data)
}

type RequestChartData struct {
	Day      string `json:"day"`
	Requests int    `json:"requests"`
}

func requestsChartHandler(c echo.Context) error {
	data := []RequestChartData{
		{Day: "Mon", Requests: 4200},
		{Day: "Tue", Requests: 5100},
		{Day: "Wed", Requests: 4800},
		{Day: "Thu", Requests: 6200},
		{Day: "Fri", Requests: 7100},
		{Day: "Sat", Requests: 4300},
		{Day: "Sun", Requests: 3900},
	}

	return c.JSON(http.StatusOK, data)
}

type ThreatChartData struct {
	Name  string `json:"name"`
	Value int    `json:"value"`
}

func threatPieChartHandler(c echo.Context) error {
	data := []ThreatChartData{
		{Name: "Prompt Injection", Value: 35},
		{Name: "Jailbreak", Value: 25},
		{Name: "PII Leakage", Value: 20},
		{Name: "Safe Requests", Value: 20},
	}

	return c.JSON(http.StatusOK, data)
}

type ModelUsageData struct {
	Model string `json:"model"`
	Usage int    `json:"usage"`
}

func modelUsageChartHandler(c echo.Context) error {
	data := []ModelUsageData{
		{Model: "GPT-4", Usage: 5200},
		{Model: "Claude", Usage: 3100},
		{Model: "Gemini", Usage: 2600},
		{Model: "Llama 3", Usage: 1900},
	}

	return c.JSON(http.StatusOK, data)
}

type User struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	Status    string `json:"status"`
	LastLogin string `json:"lastLogin"`
}

func usersHandler(c echo.Context) error {
	users := []User{
		{
			ID:        1,
			Name:      "Alice Johnson",
			Email:     "alice@company.com",
			Role:      "Admin",
			Status:    "Active",
			LastLogin: "Today, 09:15 AM",
		},
		{
			ID:        2,
			Name:      "Bob Smith",
			Email:     "bob@company.com",
			Role:      "Security Analyst",
			Status:    "Active",
			LastLogin: "Today, 08:42 AM",
		},
		{
			ID:        3,
			Name:      "Charlie Brown",
			Email:     "charlie@company.com",
			Role:      "Viewer",
			Status:    "Inactive",
			LastLogin: "Yesterday, 06:30 PM",
		},
		{
			ID:        4,
			Name:      "David Wilson",
			Email:     "david@company.com",
			Role:      "Security Analyst",
			Status:    "Active",
			LastLogin: "Today, 10:05 AM",
		},
	}

	return c.JSON(http.StatusOK, users)
}

type Model struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Provider string `json:"provider"`
	Version  string `json:"version"`
	Status   string `json:"status"`
}

func modelsHandler(c echo.Context) error {
	models := []Model{
		{
			ID:       1,
			Name:     "GPT-4o",
			Provider: "OpenAI",
			Version:  "2026.1",
			Status:   "Online",
		},
		{
			ID:       2,
			Name:     "Claude 4",
			Provider: "Anthropic",
			Version:  "4.0",
			Status:   "Maintenance",
		},
		{
			ID:       3,
			Name:     "Gemini 2.5",
			Provider: "Google",
			Version:  "2.5",
			Status:   "Offline",
		},
		{
			ID:       4,
			Name:     "Llama 3.3",
			Provider: "Meta",
			Version:  "3.3",
			Status:   "Online",
		},
	}

	return c.JSON(http.StatusOK, models)
}

type AuditLog struct {
	Timestamp string `json:"timestamp"`
	User      string `json:"user"`
	Action    string `json:"action"`
	Status    string `json:"status"`
}

func auditLogsHandler(c echo.Context) error {
	logs := []AuditLog{
		{
			Timestamp: "26 Jul 2026, 10:15 PM",
			User:      "admin",
			Action:    "Updated Firewall Rules",
			Status:    "Success",
		},
		{
			Timestamp: "26 Jul 2026, 09:42 PM",
			User:      "security_analyst",
			Action:    "Blocked Prompt Injection",
			Status:    "Warning",
		},
		{
			Timestamp: "26 Jul 2026, 08:58 PM",
			User:      "system",
			Action:    "User Login Failed",
			Status:    "Failed",
		},
	}

	return c.JSON(http.StatusOK, logs)
}

type SettingSection struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

func settingsHandler(c echo.Context) error {
	settings := []SettingSection{
		{
			Title:       "General Settings",
			Description: "Manage application configuration and preferences.",
		},
		{
			Title:       "Security Settings",
			Description: "Configure authentication, password policies, and access controls.",
		},
		{
			Title:       "Notification Settings",
			Description: "Choose when and how security alerts are delivered.",
		},
	}

	return c.JSON(http.StatusOK, settings)
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

func chat(
	ollama *ollamaClient,
	security *securityClient,
) echo.HandlerFunc {

	return func(c echo.Context) error {

		var request chatRequest

		if err := c.Bind(&request); err != nil {
			return echo.NewHTTPError(
				http.StatusBadRequest,
				"invalid JSON request body",
			)
		}

		if err := validatePrompt(request.Prompt); err != nil {
			return err
		}

		securityResult, err := security.CheckPrompt(
			c.Request().Context(),
			request.Prompt,
		)

		if err != nil {
			log.Printf("LLM Guard failed: %v", err)
			return echo.NewHTTPError(
				http.StatusBadGateway,
				"Security service is unavailable",
			)
		}

		if securityResult.Decision == "BLOCK" {
			return c.JSON(http.StatusForbidden, map[string]interface{}{
				"message":    "Prompt blocked by LLM Guard",
				"decision":   securityResult.Decision,
				"risk_score": securityResult.RiskScore,
				"reason":     "Prompt injection detected",
			})
		}

		result, err := ollama.generate(
			c.Request().Context(),
			securityResult.SanitizedPrompt,
		)

		if err != nil {
			log.Printf("Ollama generation failed: %v", err)
			return echo.NewHTTPError(
				http.StatusBadGateway,
				"LLM service is unavailable",
			)
		}

		return c.JSON(http.StatusOK, chatResponse{
			Answer: result.Response,
		})
	}
}

func (client *ollamaClient) generate(
	ctx context.Context,
	prompt string,
) (ollamaGenerateResponse, error) {

	body, err := json.Marshal(ollamaGenerateRequest{
		Model:  client.model,
		Prompt: prompt,
		Stream: false,
	})
	if err != nil {
		return ollamaGenerateResponse{},
			fmt.Errorf("encode Ollama request: %w", err)
	}

	request, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		client.baseURL+"/api/generate",
		bytes.NewReader(body),
	)
	if err != nil {
		return ollamaGenerateResponse{},
			fmt.Errorf("create Ollama request: %w", err)
	}

	request.Header.Set("Content-Type", "application/json")

	response, err := client.httpClient.Do(request)
	if err != nil {
		return ollamaGenerateResponse{},
			fmt.Errorf("send Ollama request: %w", err)
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return ollamaGenerateResponse{},
			fmt.Errorf("Ollama returned status %d", response.StatusCode)
	}

	var result ollamaGenerateResponse

	if err := json.NewDecoder(response.Body).Decode(&result); err != nil {
		return ollamaGenerateResponse{},
			fmt.Errorf("decode Ollama response: %w", err)
	}

	return result, nil
}

func validatePrompt(prompt string) error {
	if strings.TrimSpace(prompt) == "" {
		return echo.NewHTTPError(
			http.StatusBadRequest,
			"prompt is required",
		)
	}

	if len(prompt) > maxPromptLength {
		return echo.NewHTTPError(
			http.StatusBadRequest,
			"prompt is too long",
		)
	}

	return nil
}
