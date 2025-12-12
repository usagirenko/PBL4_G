from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.crud import meal_plan as crud_meal
from app.schemas.meal_plan import MealPlanOut

router = APIRouter(prefix="/meal-plan", tags=["meal-plan"])

@router.get("", response_model=dict)
def get_meal_plan(db: Session = Depends(get_db)):
    return crud_meal.get_plan(db).plan

@router.put("", response_model=dict)
def update_meal_plan(plan: dict, db: Session = Depends(get_db)):
    return crud_meal.update_plan(db, plan).plan
