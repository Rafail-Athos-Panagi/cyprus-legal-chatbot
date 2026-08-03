import uvicorn

if __name__ == "__main__":
    uvicorn.run("api.api:app" , port = 3334 , reload= True)