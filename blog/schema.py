from pydantic import BaseModel
from typing import List

class BlogBase(BaseModel):
    title: str
    body: str

class Blog(BlogBase):
    class Config():
        orm_mode = True


class User(BaseModel):
    username: str
    password: str
    email: str

class ShowUser(BaseModel):
    username: str
    email: str
    blogs: List[Blog] = []

    class Config():
        orm_mode = True


class ShowBlog(BaseModel):
    title: str
    body: str
    creater: ShowUser

    class Config():
        orm_mode = True

class Login(BaseModel):
    username: str
    password: str


