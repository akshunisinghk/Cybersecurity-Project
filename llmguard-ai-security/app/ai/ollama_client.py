import ollama
from app.core.config import settings

# HTTP client for Ollama
ollama_client = ollama.Client(host=settings.OLLAMA_HOST)


class OllamaClient:
    def __init__(self):
        self.model = settings.MODEL_NAME

    def generate(self, prompt: str) -> str:
        response = ollama_client.chat(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        return response["message"]["content"]


client = OllamaClient()