from enum import Enum
from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class ItemStatus(str, Enum):
    AVAILABLE = "available"
    LOANED = "loaned"
    LOST = "lost"
    MAINTENANCE = "maintenance"

class Resource(Base):
    """
    Represents the 'Manifestation' in FRBR terms. 
    This is what users search for (e.g., 'Harry Potter and the Sorcerer's Stone', 1997 Edition).
    """
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    author = Column(String, index=True, nullable=False)  # MVP: Simple string. Phase 2: Relational Agent.
    isbn = Column(String, unique=True, index=True, nullable=True)
    publisher = Column(String, index=True)
    publication_year = Column(Integer, index=True)
    
    # LIS Classification
    call_number = Column(String, index=True) # e.g., '823.914 ROW'
    subject_headings = Column(Text) # MVP: Comma-separated strings. Phase 2: Many-to-Many table.
    
    description = Column(Text, nullable=True)
    cover_image = Column(String, nullable=True)
    
    # Relationships
    items = relationship("Item", back_populates="resource", cascade="all, delete-orphan")

class Item(Base):
    """
    Represents the 'Item' in FRBR terms.
    The physical object on the shelf.
    """
    id = Column(Integer, primary_key=True, index=True)
    barcode = Column(String, unique=True, index=True, nullable=False)
    status = Column(SQLAlchemyEnum(ItemStatus), default=ItemStatus.AVAILABLE)
    
    # Physical details
    location = Column(String) # e.g., "Floor 2, Shelf A"
    condition_notes = Column(String, nullable=True)
    
    # Relationships
    resource_id = Column(Integer, ForeignKey("resource.id"))
    resource = relationship("Resource", back_populates="items")
