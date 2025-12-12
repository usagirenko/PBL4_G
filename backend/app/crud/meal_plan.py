from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.meal_plan import MealPlan

def get_plan(db: Session) -> MealPlan:
    mp = db.scalar(select(MealPlan).where(MealPlan.id == 1))
    if not mp:
        mp = MealPlan(id=1, plan={})
        db.add(mp)
        db.commit()
        db.refresh(mp)
    return mp

def update_plan(db: Session, plan: dict) -> MealPlan:
    mp = get_plan(db)
    mp.plan = plan
    db.commit()
    db.refresh(mp)
    return mp
