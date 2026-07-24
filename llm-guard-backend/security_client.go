package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type securityClient struct {
	baseURL string
	client  *http.Client
}

func newSecurityClient(baseURL string) *securityClient {
	return &securityClient{
		baseURL: baseURL,
		client: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (s *securityClient) CheckPrompt(
	ctx context.Context,
	prompt string,
) (SecurityCheckResponse, error) {

	requestBody := SecurityCheckRequest{
		Prompt: prompt,
	}

	body, err := json.Marshal(requestBody)
	if err != nil {
		return SecurityCheckResponse{}, err
	}

	req, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		s.baseURL+"/security-check",
		bytes.NewBuffer(body),
	)
	if err != nil {
		return SecurityCheckResponse{}, err
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := s.client.Do(req)
	if err != nil {
		return SecurityCheckResponse{}, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return SecurityCheckResponse{},
			fmt.Errorf("security service returned %d", resp.StatusCode)
	}

	var result SecurityCheckResponse

	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return SecurityCheckResponse{}, err
	}

	return result, nil
}
