import uvicorn

if __name__ == "__main__":
    uvicorn.run("app/api.py" , port = 3334 , reload= True)