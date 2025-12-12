from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.recipe import Recipe

def list_recipes(db: Session) -> list[Recipe]:
    return list(db.scalars(select(Recipe).order_by(Recipe.id.desc())))

def create_recipe(db: Session, payload: dict) -> Recipe:
    r = Recipe(**payload)
    db.add(r)
    db.commit()
    db.refresh(r)
    return r

def get_recipe(db: Session, recipe_id: int) -> Recipe | None:
    return db.scalar(select(Recipe).where(Recipe.id == recipe_id))

def update_recipe(db: Session, recipe: Recipe, payload: dict) -> Recipe:
    for k, v in payload.items():
        setattr(recipe, k, v)
    db.commit()
    db.refresh(recipe)
    return recipe

def delete_recipe(db: Session, recipe: Recipe) -> None:
    db.delete(recipe)
    db.commit()
