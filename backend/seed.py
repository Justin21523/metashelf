import asyncio
import sys
import os

# Add the current directory (backend/) to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import AsyncSessionLocal
from app.repositories.resource_repo import ResourceRepository
from app.schemas.resource import ResourceCreate

INITIAL_DATA = [
    {
        "title": "The Design of Everyday Things",
        "author": "Don Norman",
        "isbn": "978-0465050659",
        "publisher": "Basic Books",
        "publication_year": 2013,
        "call_number": "620.82 NOR",
        "subject_headings": "Design, Psychology, Usability",
        "description": "The Design of Everyday Things shows that good, usable design is possible. The rules are simple: make things visible, exploit natural relationships that couple function and control, and make intelligent use of constraints.",
        "cover_image": "https://m.media-amazon.com/images/I/410RTQezHYL._SY445_SX342_.jpg"
    },
    {
        "title": "Dune",
        "author": "Frank Herbert",
        "isbn": "978-0441013593",
        "publisher": "Ace",
        "publication_year": 1965,
        "call_number": "813.54 HER",
        "subject_headings": "Science Fiction, Politics, Ecology",
        "description": "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange.",
        "cover_image": "https://m.media-amazon.com/images/I/91R59x54k+L._SY522_.jpg"
    },
    {
        "title": "Refactoring",
        "author": "Martin Fowler",
        "isbn": "978-0201485677",
        "publisher": "Addison-Wesley",
        "publication_year": 1999,
        "call_number": "005.1 FOW",
        "subject_headings": "Software Engineering, Code Quality",
        "description": "Refactoring is about improving the design of existing code. It is the process of changing a software system in such a way that it does not alter the external behavior of the code yet improves its internal structure.",
        "cover_image": "https://m.media-amazon.com/images/I/81h8Z9v9a5L._SY522_.jpg"
    }
]

async def seed_data():
    async with AsyncSessionLocal() as session:
        repo = ResourceRepository(session)
        
        # Check if data exists
        existing = await repo.get_multi(limit=1)
        if existing:
            print("Datbase already contains data. Skipping seed.")
            return
            
        print("Seeding initial data...")
        for data in INITIAL_DATA:
            resource_in = ResourceCreate(**data)
            await repo.create(resource_in)
            print(f"Created: {data['title']}")
        
        print("Seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed_data())
