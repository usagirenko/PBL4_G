from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.api.deps import get_db
from app.models.user import User
from app.schemas.auth import LoginIn, RegisterIn
from app.core.security import verify_password, hash_password

router = APIRouter(prefix="/auth", tags=["auth"])

def _user_out(user: User) -> dict:
    # フロントは result.user を参照する
    return {"user": {"id": user.id, "name": getattr(user, "name", None), "email": user.email}}

@router.post("/signup")
def signup(body: RegisterIn, db: Session = Depends(get_db)):
    exists = db.scalar(select(User).where(User.email == body.email))
    if exists:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(email=body.email, password_hash=hash_password(body.password))
    # name を保存したいなら User モデルに name カラム追加（下に書く）
    if hasattr(user, "name"):
        user.name = getattr(body, "name", None)  # RegisterInを拡張するならここも

    db.add(user)
    db.commit()
    db.refresh(user)
    return _user_out(user)

@router.post("/login")
def login(body: LoginIn, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == body.email))
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return _user_out(user)
