from pydantic import BaseModel

class MealPlanOut(BaseModel):
    plan: dict
