from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.core.config import settings
from app.db.session import engine
from app.db.base_class import Base

# Import models so they are registered with Base metadata
from app.models import user, catalog

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup (MVP only)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

@app.get("/")
def root():
    return {"message": "Welcome to MetaShelf API"}

from app.api.v1.api import api_router
app.include_router(api_router, prefix=settings.API_V1_STR)
