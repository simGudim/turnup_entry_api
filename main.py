from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
import uvicorn

app = FastAPI()

@app.get("/")
def start():
    return "nothiong"

@app.get("/about")
def about(limit: bool = True, sort: Optional[str] = None):
    return {"data" : {f"about page : {limit}"}}

class Blog(BaseModel):
    title: str
    body: str
    published: Optional[bool]


@app.post("/blog")
def blog(request: Blog):
    return request


@app.get("/{id}")
def index(id: int):
    return {
        "data" : {"id" : id}
    }

if __name__ == "__main__":
    uvicorn.run(app, host = "127.0.0.1", port = "9000")