import re

JAILBREAK_PATTERNS = [
    r"pretend\s+to\s+be",
    r"act\s+as",
    r"developer\s+mode",
    r"dan",
    r"do\s+anything\s+now",
    r"without\s+restrictions",
    r"ignore\s+safety",
    r"bypass\s+policy",
    r"unfiltered",
    r"roleplay"
]

def detect_jailbreak(prompt: str):

    prompt = prompt.lower()

    matches = []

    for pattern in JAILBREAK_PATTERNS:
        if re.search(pattern, prompt):
            matches.append(pattern)

    return {
        "is_jailbreak": len(matches) > 0,
        "matched_patterns": matches
    }