from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.session import engine
from app.db.base import Base

from app.models.user import User  # noqa
from app.models.recipe import Recipe  # noqa
from app.models.meal_plan import MealPlan  # noqa  ← 追加

from app.api.routes.auth import router as auth_router
from app.api.routes.recipes import router as recipes_router
from app.api.routes.meal_plan import router as meal_plan_router  # ← 追加

app = FastAPI(title="Recipe API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(recipes_router)
app.include_router(meal_plan_router)  # ← 追加

@app.get("/health")
def health():
    return {"ok": True}
