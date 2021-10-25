# @router.post("/", response_model = schema.ShowUser)
# def create_user(request: schema.User,response: Response, db: Session = Depends(database.get_db)):
#     hashedPassword = Hash.bcrypt(request.password)
#     new_user = models.User(username = request.username, email = request.email, password = hashedPassword)
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     response.status_code = 200
#     return new_user

from .. import models, schema
from ..utils import database, oauth2
from ..utils.hashing import Hash
from fastapi import APIRouter, Response, HTTPException
from fastapi import Depends
from sqlalchemy.orm import Session

router = APIRouter(
    prefix = "/test",
    tags = ["test"]
)

@router.get("/")
def gettest():
    return "poo"

@router.get("/user")
def gettest():
    return "jabroni"

@router.get("/guy/{id}")
def gettest(id:int):
    return "poo {}".format(id)
