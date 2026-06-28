from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "MetaShelf"
    PROJECT_VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Database (Default to SQLite for MVP)
    SQLALCHEMY_DATABASE_URI: str = "sqlite+aiosqlite:///./metashelf.db"

    class Config:
        case_sensitive = True

settings = Settings()
