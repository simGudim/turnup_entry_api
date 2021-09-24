from fastapi import FastAPI, Response, HTTPException
from fastapi import Depends
from . import schema, models
from .database import engine, SessionLocal
from sqlalchemy.orm import Session
from typing import List
from passlib.context import CryptContext

app = FastAPI()
models.Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/blog")
def create(request: schema.Blog, db: Session = Depends(get_db)):
    new_blog = models.Blog(title = request.title, body = request.body)
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

@app.delete("/blog/{id}")
def delete(id, db: Session = Depends(get_db)):
    db.query(models.Blog)\
        .filter(models.Blog.id == id)\
        .delete(synchronize_session=False)
    db.commit()
    return "done"

@app.put("/blog/{id}")
def update(id, request: schema.Blog, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id)
    if not blog:
        raise HTTPException(status = 404, details = "not found")
    else:
        db.query(models.Blog)\
            .filter(models.Blog.id == id)\
            .update({"title" : "lansdn"})

        return "updates"



@app.get("/blog", response_model = List[schema.ShowBlog])
def get_all(db: Session = Depends(get_db)):
    blogs = db.query(models.Blog).all()
    return blogs

@app.get("/blog/{id}", response_model = schema.ShowBlog)
def show(id, response: Response, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code = 201, details = "Blog not found")
    response.status_code = 201
    return blog

pwd_cxt = CryptContext(schemes = ["bcrypt"], deprecated = "auto")

@app.post("/user")
def create_user(request: schema.User,db: Session = Depends(get_db)):
    hashedPassword = pwd.cxt.hash(request.paswword)
    new_user = models.User(username = request.username, email = request.email, password = hasedPassword)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user