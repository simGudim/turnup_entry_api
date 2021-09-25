from fastapi import APIRouter, Response, HTTPException
from fastapi import Depends
from .. import models, schema
from ..utils.hashing import Hash
from ..utils import database
from sqlalchemy.orm import Session

router = APIRouter(
    prefix = "/user",
    tags = ["users"]
)

@router.post("/", response_model = schema.ShowUser)
def create_user(request: schema.User,response: Response, db: Session = Depends(database.get_db)):
    hashedPassword = Hash.bcrypt(request.password)
    new_user = models.User(username = request.username, email = request.email, password = hashedPassword)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    response.status_code = 200
    return new_user

@router.get("/{id}", response_model = schema.ShowUser)
def get_user(id: int, response: Response, db: Session = Depends(database.get_db)):
    user = db.query(models.User)\
        .filter(models.User.id == id)\
        .first()

    if not user:
        raise HTTPException(status_code = 404, detail = "user not found")
    response.status_code = 200
    return user