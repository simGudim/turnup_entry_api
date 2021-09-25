from fastapi import APIRouter, Response, HTTPException
from fastapi import Depends
from .. import models, schema
from ..utils import database
from sqlalchemy.orm import Session
from typing import List

router = APIRouter(
    prefix = "/blog",
    tags = ["blogs"]
)

@router.post("/")
def create(request: schema.Blog, db: Session = Depends(database.get_db)):
    new_blog = models.Blog(title = request.title, body = request.body, user_id = 1)
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

@router.delete("/{id}")
def delete(id, db: Session = Depends(database.get_db)):
    db.query(models.Blog)\
        .filter(models.Blog.id == id)\
        .delete(synchronize_session=False)
    db.commit()
    return "done"

@router.put("/{id}")
def update(id, request: schema.Blog, db: Session = Depends(database.get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id)
    if not blog:
        raise HTTPException(status = 404, details = "not found")
    else:
        db.query(models.Blog)\
            .filter(models.Blog.id == id)\
            .update({"title" : "lansdn"})

        return "updates"

@router.get("/", response_model = List[schema.ShowBlog])
def get_all(db: Session = Depends(database.get_db)):
    blogs = db.query(models.Blog).all()
    return blogs

@router.get("/{id}", response_model = schema.ShowBlog)
def show(id, response: Response, db: Session = Depends(database.get_db)):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code = 404, detail = "Blog not found")
    response.status_code = 201
    return blog