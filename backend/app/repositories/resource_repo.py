from typing import List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.catalog import Resource
from app.schemas.resource import ResourceCreate

class ResourceRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_multi(self, skip: int = 0, limit: int = 100) -> List[Resource]:
        result = await self.session.execute(
            select(Resource).offset(skip).limit(limit)
        )
        return result.scalars().all()

    async def create(self, obj_in: ResourceCreate) -> Resource:
        db_obj = Resource(
            title=obj_in.title,
            author=obj_in.author,
            isbn=obj_in.isbn,
            publisher=obj_in.publisher,
            publication_year=obj_in.publication_year,
            call_number=obj_in.call_number,
            subject_headings=obj_in.subject_headings,
            description=obj_in.description,
            cover_image=obj_in.cover_image
        )
        self.session.add(db_obj)
        await self.session.commit()
        await self.session.refresh(db_obj)
        return db_obj
