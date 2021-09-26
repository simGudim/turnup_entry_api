from .. import  models, schema
from ..utils import database, token
from ..utils.hashing import Hash
from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from sqlalchemy.orm import Session

router = APIRouter(
    prefix = "/login",
    tags = ["login"]
)


# This is the login route whihc generates the token 
@router.post("/")
def login(response: Response, request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User)\
        .filter(models.User.username == request.username)\
        .first()
    if not user:
        raise HTTPException(status_code = 400, detail = "user not found")
    if Hash.verify(request.password, user.password):
        response.status_code = 200

    # TODO: put expire on the token
    access_token_expires = timedelta(minutes=token.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = token.create_access_token(
        data={"sub": user.username}
    )
    return {"access_token": access_token, "token_type": "bearer"}