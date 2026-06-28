from typing import Optional, List
from pydantic import BaseModel, ConfigDict

# Base schema with shared properties
class ResourceBase(BaseModel):
    title: str
    author: str
    isbn: Optional[str] = None
    publisher: Optional[str] = None
    publication_year: Optional[int] = None
    call_number: Optional[str] = None
    subject_headings: Optional[str] = None # Keeping it simple for MVP
    description: Optional[str] = None
    cover_image: Optional[str] = None

# Properties to receive on creation
class ResourceCreate(ResourceBase):
    pass

# Properties to return to client (includes ID)
class Resource(ResourceBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

# Schema for paginated response (optional but good practice)
class ResourceList(BaseModel):
    items: List[Resource]
    total: int
