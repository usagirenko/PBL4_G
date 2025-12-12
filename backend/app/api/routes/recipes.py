from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.recipe import RecipeCreate, RecipeUpdate, RecipeOut
from app.crud import recipe as crud_recipe

router = APIRouter(prefix="/recipes", tags=["recipes"])

@router.get("", response_model=list[RecipeOut])
def list_recipes(db: Session = Depends(get_db)):
    return crud_recipe.list_recipes(db)

@router.post("", response_model=RecipeOut)
def create_recipe(body: RecipeCreate, db: Session = Depends(get_db)):
    return crud_recipe.create_recipe(db, body.model_dump())

@router.put("/{recipe_id}", response_model=RecipeOut)
def update_recipe(recipe_id: int, body: RecipeUpdate, db: Session = Depends(get_db)):
    r = crud_recipe.get_recipe(db, recipe_id)
    if not r:
        raise HTTPException(status_code=404, detail="Recipe not found")
    payload = {k: v for k, v in body.model_dump().items() if v is not None}
    return crud_recipe.update_recipe(db, r, payload)

@router.delete("/{recipe_id}")
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    r = crud_recipe.get_recipe(db, recipe_id)
    if not r:
        raise HTTPException(status_code=404, detail="Recipe not found")
    crud_recipe.delete_recipe(db, r)
    return {"ok": True}
