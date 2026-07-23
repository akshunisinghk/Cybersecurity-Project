from app.security.prompt_injection import detect_prompt_injection
from app.security.jailbreak_detector import detect_jailbreak
from app.security.prompt_sanitizer import sanitize_prompt
from app.ai.security_analyzer import analyze_prompt
from app.utils.logger import logger

def evaluate_prompt(prompt: str):

    sanitized_prompt = sanitize_prompt(prompt)

    injection_result = detect_prompt_injection(prompt)
    jailbreak_result = detect_jailbreak(prompt)

    # Analyze the sanitized prompt instead of the original
    ai_result = analyze_prompt(prompt)

    score = 0

    if injection_result["is_malicious"]:
        score += 40

    if jailbreak_result["is_jailbreak"]:
        score += 40

    if ai_result["classification"] == "MALICIOUS":
        score += ai_result["confidence"] // 2

    score = min(score, 100)

    if score >= 80:
        decision = "BLOCK"
    elif score >= 40:
        decision = "WARN"
    else:
        decision = "ALLOW"

    logger.info(
    """
Original Prompt: {prompt}
Sanitized Prompt: {sanitized_prompt}
Injection: {injection_result['is_malicious']}
Jailbreak: {jailbreak_result['is_jailbreak']}
AI Classification: {ai_result['classification']}
Risk Score: {score}
Decision: {decision}
"""
)

    return {
        "original_prompt": prompt,
        "sanitized_prompt": sanitized_prompt,
        "prompt_injection": injection_result,
        "jailbreak_detection": jailbreak_result,
        "ai_detection": ai_result,
        "risk_score": score,
        "decision": decision
    }