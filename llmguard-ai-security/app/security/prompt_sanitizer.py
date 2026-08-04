import re

SANITIZATION_RULES = [
    (r"ignore\s+previous\s+instructions?", "[REMOVED: instruction override]"),
    (r"forget\s+previous\s+instructions?", "[REMOVED: instruction override]"),
    (r"reveal\s+your\s+system\s+prompt", "[REMOVED: system prompt extraction]"),
    (r"pretend\s+to\s+be", "[REMOVED: role manipulation]"),
    (r"developer\s+mode", "[REMOVED: jailbreak attempt]"),
    (r"without\s+restrictions", "[REMOVED: jailbreak attempt]"),
]

def sanitize_prompt(prompt: str):

    sanitized = prompt

    for pattern, replacement in SANITIZATION_RULES:
        sanitized = re.sub(
            pattern,
            replacement,
            sanitized,
            flags=re.IGNORECASE
        )

    return sanitized