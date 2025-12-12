from pydantic import BaseModel

class RecipeCreate(BaseModel):
    title: str
    image: str | None = None
    tags: list[str] = []
    ingredients: list[str] = []
    instructions: str | None = None

class RecipeUpdate(BaseModel):
    title: str | None = None
    image: str | None = None
    tags: list[str] | None = None
    ingredients: list[str] | None = None
    instructions: str | None = None

class RecipeOut(BaseModel):
    id: int
    title: str
    image: str | None
    tags: list[str]
    ingredients: list[str]
    instructions: str | None

    class Config:
        from_attributes = True
