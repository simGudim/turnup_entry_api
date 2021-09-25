from fastapi import APIRouter, Depends, HTTPException, Response
from .. import schema, models
from ..utils.hashing import Hash
from ..utils import database
from sqlalchemy.orm import Session

router = APIRouter(
    prefix = "/login",
    tags = ["login"]
)

@router.post("/")
def login(request: schema.Login, response: Response, db: Session = Depends(database.get_db)):
    user = db.query(models.User)\
        .filter(models.User.username == request.username)\
        .first()
    if not user:
        raise HTTPException(status_code = 400, detail = "user not found")
    if Hash.verify(request.password, user.password):
        response.status_code = 200
        return user