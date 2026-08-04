package main

type SecurityCheckRequest struct {
	Prompt string `json:"prompt"`
}

type SecurityCheckResponse struct {
	OriginalPrompt  string `json:"original_prompt"`
	SanitizedPrompt string `json:"sanitized_prompt"`

	RiskScore int    `json:"risk_score"`
	Decision  string `json:"decision"`
}
