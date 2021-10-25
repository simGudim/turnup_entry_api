from .. import models, schema
from ..utils import database, oauth2
from ..utils.hashing import Hash
from fastapi import APIRouter, Response, HTTPException
from fastapi import Depends
from sqlalchemy.orm import Session

router = APIRouter(
    prefix = "/user",
    tags = ["users"]
)

# creates a new user in the database and hashes the password
@router.post("/", response_model = schema.ShowUser)
async def create_user(request: schema.User,response: Response, db: Session = Depends(database.get_db)):
    try:
        hashedPassword = Hash.bcrypt(request.password)
        new_user = models.User(username = request.username, email = request.email, password = hashedPassword)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        response.status_code = 200
        return new_user
    except:
        response.status_code = 400
        return {"message" : "didn't create a user"}
    
# current_user: schema.User = Depends(oauth2.get_current_user)
# gets the user with a specific ID
@router.get("/{id}", response_model = schema.ShowUser)
async def get_user(
    id: int, response: Response, 
    db: Session = Depends(database.get_db), 
    current_user: schema.User = Depends(oauth2.get_current_user)
):
    user = db.query(models.User)\
        .filter(models.User.id == id)\
        .first()

    if not user:
        raise HTTPException(status_code = 404, detail = "user not found")
    response.status_code = 200
    return user