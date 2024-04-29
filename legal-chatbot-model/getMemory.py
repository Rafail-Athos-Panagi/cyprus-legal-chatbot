import os
from llama_index.core.storage.chat_store import SimpleChatStore
from llama_index.core.memory import ChatMemoryBuffer

def getMemory(name_key , store_key):
    chat_store = SimpleChatStore()
    file_path = f"./storage/memory_chats/{name_key}/{store_key}.json"

    if os.path.exists(file_path):
        chat_store = SimpleChatStore.from_persist_path(persist_path=file_path)
        print("Returning Memory:")

    chat_messages_list = []

    for chat_message in chat_store.get_messages(store_key):
         chat_messages_list.append({
             "role": chat_message.role,
             "content": chat_message.content
         })

    # print(chat_messages_list)

    return chat_messages_list