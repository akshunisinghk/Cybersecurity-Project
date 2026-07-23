import ollama
from app.core.config import settings


class OllamaClient:
    def __init__(self):
        self.model = settings.MODEL_NAME

    def generate(self, prompt: str) -> str:
        response = ollama.chat(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response["message"]["content"]


client = OllamaClient()