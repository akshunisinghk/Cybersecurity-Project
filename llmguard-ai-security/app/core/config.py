from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    OLLAMA_HOST: str = "http://localhost:11434"
    MODEL_NAME: str = "llama3.2"
    LOG_LEVEL: str = "INFO"

    model_config = SettingsConfigDict(
        env_file=".env"
    )


settings = Settings()