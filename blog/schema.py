from sqlalchemy.sql.base import SchemaVisitor
from pydantic import BaseModel

class Blog(BaseModel):
    title: str
    body: str

class ShowBlog(BaseModel):
    title: str
    body: str
    class Config():
        orm_mode = True

class User(BaseModel):
    username: str
    password: str
    email: str

class ShowUser(BaseModel):
    username: str
    email: str

    class Config():
        orm_mode = True


