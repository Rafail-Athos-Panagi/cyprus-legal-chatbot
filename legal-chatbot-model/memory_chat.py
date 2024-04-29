import os
from llama_index.core.storage.chat_store import SimpleChatStore
from llama_index.core.memory import ChatMemoryBuffer

def getMemory(name_key , store_key):
    chat_store = SimpleChatStore()
    file_path = f"./storage/memory_chats/{name_key}/{store_key}.json"

    if os.path.exists(file_path):
        chat_store = SimpleChatStore.from_persist_path(persist_path=file_path)
        print("Loading Memory:")
    else:
        saveMemory(chat_store , name_key , store_key)
        print("Creating New Memory:")

    chat_memory = ChatMemoryBuffer.from_defaults(
        token_limit=3000,
        chat_store=chat_store,
        chat_store_key=store_key,
    )
    return chat_memory

def saveMemory(chat_store , name_key , store_key):
    file_path = f"./storage/memory_chats/{name_key}/{store_key}.json"

    chat_store.persist(persist_path=file_path)
    print("Saving Memory:")
