from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.repositories.resource_repo import ResourceRepository
from app.schemas import resource as schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.Resource])
async def read_resources(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
) -> Any:
    """
    Retrieve resources (books, media, etc.).
    """
    repo = ResourceRepository(db)
    resources = await repo.get_multi(skip=skip, limit=limit)
    return resources

@router.post("/", response_model=schemas.Resource)
async def create_resource(
    *,
    db: AsyncSession = Depends(get_db),
    resource_in: schemas.ResourceCreate,
) -> Any:
    """
    Create new resource (For seeding/admin use).
    """
    repo = ResourceRepository(db)
    return await repo.create(resource_in)
