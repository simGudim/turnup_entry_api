from fastapi import FastAPI
from . import models
from .utils.database import engine
from .utils.hashing import Hash
from .routers import blogs, users, login

app = FastAPI()
models.Base.metadata.create_all(engine)
hashing = Hash()


@app.get("/hey")
def index():
    return "hey"

app.include_router(blogs.router)
app.include_router(users.router)
app.include_router(login.router)

if __name__ == "__main__":
    app.run()


