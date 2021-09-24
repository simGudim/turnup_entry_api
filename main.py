from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def index():
    return {
        "data" : {"name" : "Simon"}
    }

@app.get("/about")
def about():
    return {"data" : {"about page"}}


# if __name__ == "__main__":
#     uvicorn.run(app, port = 9000, host = "127.0.0.1")