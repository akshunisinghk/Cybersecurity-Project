from pydantic import BaseModel
from typing import Dict, Any


class SecurityResponse(BaseModel):
    prompt_injection: Dict[str, Any]
    jailbreak_detection: Dict[str, Any]
    ai_detection: Dict[str, Any]
    risk_score: int
    decision: str