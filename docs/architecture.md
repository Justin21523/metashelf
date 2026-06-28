# MetaShelf Architecture & Design

## 1. Overview
MetaShelf is a Resource Discovery and Exchange Platform built on Library and Information Science (LIS) principles with a modern e-commerce user experience.

## 2. System Architecture
We adhere to **Clean Architecture** principles to ensure scalability, maintainability, and testability.

### Layers
1.  **Domain (Models):** SQLAlchemy models representing the database schema. Core business entities.
2.  **Schemas (DTOs):** Pydantic models for data validation and API request/response structures.
3.  **Repositories:** Abstracts the database access. Contains raw SQL/ORM queries.
4.  **Services:** Contains business logic (e.g., "Check if book is available", "Calculate relevance score"). Orchestrates repositories.
5.  **API (Routers):** Handles HTTP requests, dependency injection, and returns responses.

### Tech Stack
-   **Backend:** FastAPI (Python 3.10+)
-   **Database:** SQLite (MVP), PostgreSQL (Production target)
-   **ORM:** SQLAlchemy 2.0+ (Async)
-   **Frontend:** React 18, Vite, TypeScript, Tailwind CSS
-   **Auth:** OAuth2 with Password Flow (JWT)

## 3. Data Modeling (MVP: FRBR-lite)
To balance LIS strictness with MVP velocity, we use a simplified model:

-   **Resource:** Combines FRBR *Work* and *Manifestation*. Represents the bibliographic metadata (Title, ISBN, Author, Publisher).
-   **Item:** Represents the FRBR *Item*. The physical or digital instance held by a library/user (Barcode, Shelf Location, Status).
-   **Agent:** Represents *Authors* and *Publishers* for authority control.

### Entity Relationship Diagram (Conceptual)
`Author (1) <-> (N) Resource (1) <-> (N) Item`
`Subject (M) <-> (N) Resource`

## 4. API Design Strategy
-   RESTful endpoints.
-   `/api/v1/resources`: Catalog search and retrieval.
-   `/api/v1/items`: Inventory management.
-   `/api/v1/auth`: Authentication and Authorization.

## 5. Directory Structure
```
backend/
  app/
    api/          # Routes
    core/         # Config, Security
    db/           # Database connection
    models/       # DB Tables
    schemas/      # Pydantic DTOs
    repositories/ # DB Access Pattern
    services/     # Business Logic
    main.py       # Entry point
```
