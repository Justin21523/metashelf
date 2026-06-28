from enum import Enum
from sqlalchemy import Column, Integer, String, Boolean, Enum as SQLAlchemyEnum
from app.db.base_class import Base

class UserRole(str, Enum):
    ADMIN = "admin"
    LIBRARIAN = "librarian"
    USER = "user"

class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, index=True)
    is_active = Column(Boolean, default=True)
    role = Column(SQLAlchemyEnum(UserRole), default=UserRole.USER)
