import re

INJECTION_PATTERNS = [
    r"ignore\s+previous",
    r"ignore\s+all",
    r"forget\s+previous",
    r"forget\s+instructions",
    r"system\s+prompt",
    r"developer\s+mode",
    r"jailbreak",
    r"act\s+as",
    r"bypass",
]


def detect_prompt_injection(prompt: str):
    prompt = prompt.lower()

    detected = []

    for pattern in INJECTION_PATTERNS:
        if re.search(pattern, prompt):
            detected.append(pattern)

    return {
        "is_malicious": len(detected) > 0,
        "matched_patterns": detected,
    }