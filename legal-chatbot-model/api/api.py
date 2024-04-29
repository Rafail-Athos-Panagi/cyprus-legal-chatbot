from fastapi import FastAPI , File, Response
from pydantic import BaseModel
from addMetaData import result
from getMemory import getMemory
from fastapi.responses import StreamingResponse
from starlette.responses import FileResponse
from pathlib import Path

app = FastAPI()

class takeResultDto(BaseModel):
    query: str
    chat_store_key: str
    chat_name_key: str

class getChatDto(BaseModel):
    chat_store_key: str
    chat_name_key: str

class getFileDto(BaseModel):
    file_name: str

@app.post("/take_result")
async def take_result(takeResultDto: takeResultDto):
    print(takeResultDto)
    return result(takeResultDto)

@app.post("/get_chat")
async def get_memory(getChatDto: getChatDto):
    print(getChatDto)
    return getMemory(getChatDto.chat_name_key , getChatDto.chat_store_key)

@app.post("/get_file")
async def get_memory(getFileDto: getFileDto):
    print(getFileDto)
    file_path = f"./Data/{getFileDto.file_name}"
    return FileResponse(file_path, media_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
