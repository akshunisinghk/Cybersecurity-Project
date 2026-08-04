import re

OUTPUT_PATTERNS = [
    r"api[_\s]?key",
    r"password",
    r"private\s+key",
    r"secret",
    r"token",
    r"credit\s+card",
    r"social\s+security",
    r"malware",
    r"ransomware",
    r"shell\s+command",
]


def filter_output(response: str):

    detected = []

    filtered = response

    for pattern in OUTPUT_PATTERNS:

        if re.search(pattern, filtered, re.IGNORECASE):

            detected.append(pattern)

            filtered = re.sub(
                pattern,
                "[REDACTED]",
                filtered,
                flags=re.IGNORECASE
            )

    return {
        "is_safe": len(detected) == 0,
        "detected_patterns": detected,
        "filtered_output": filtered
    }