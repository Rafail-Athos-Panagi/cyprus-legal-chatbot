import logging
import sys
from createIndex import creatingIndex
from memory_chat import getMemory , saveMemory


logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))
import os
from dotenv import load_dotenv, find_dotenv
import openai
import nest_asyncio

from llama_index.core.prompts import PromptTemplate

def result(queryData):
    # query = "Ποια δικαστίκη απόφαση περιλαμβάνει υπόθεση με αυτοκινητιστικό δυστήχημα? Και ποιοι ήταν οι άμεσα εμπλεκόμενοι? Και ποιος ήταν ο δικαστής?"
    nest_asyncio.apply()

    load_dotenv(find_dotenv(), override=True)
    os.environ["OPENAI_API_KEY"] = os.environ.get("OPENAI_API_KEY")
    openai.api_key = os.environ.get("OPENAI_API_KEY")

    index = creatingIndex()

    text_qa_template_str = (
        "You are a Cypriot legal assistant that you have trained on the Cyprus legal decisions for the years 1985 to 1995.\n"
        "Always answer the query only using the provided context information, "
        "and not prior knowledge.\n"
        "Some rules to follow:\n"
        "1. Never directly reference the given context in your answer.\n"
        "2. Avoid statements like 'Based on the context, ...' or "
        "3. Always answer the question based on the language used in the question "
        "'The context information ...' or anything along "
        "those lines."
        "Context information is below.\n"
        "---------------------\n"
        "{context_str}\n"
        "---------------------\n"
        "Answer the question: {query_str}\n"
    )

    memory = getMemory(queryData.chat_name_key , queryData.chat_store_key)

    text_qa_template = PromptTemplate(text_qa_template_str)
    chat_engine = index.as_chat_engine(chat_mode="condense_question", text_qa_template=text_qa_template , verbose=True , memory=memory)

    response = chat_engine.chat(queryData.query)
    # print("MEMORY AFTER " , memory[""] ,"\n\n")

    # print("MEMORY AFTER CHAT STORE" , memory.chat_store ,"\n\n")

    chat_store = memory.chat_store
    chat_store_key = memory.chat_store_key

    chat_messages = chat_store.get_messages(chat_store_key)

    chat_messages_list = []

    for chat_message in chat_messages:
         chat_messages_list.append({
             "role": chat_message.role,
             "content": chat_message.content
         })


    # print(chat_messages_list)
    # print(chat_store_key)

    # print(response)
    sources = response.source_nodes

    for source in sources:
        metadata = source.metadata
        file_name = metadata['file_name']
        file_path = metadata['file_path']
        questions_this_excerpt_can_answer = metadata["questions_this_excerpt_can_answer"]
        
        source_data = {
            "response_data": {
                "chat_messages": chat_messages_list,
                "response": response.response,
                "file_name": file_name,
                "file_path": file_path,
                "questions_this_excerpt_can_answer": questions_this_excerpt_can_answer
            },
            "memory_data": {
                "chat_name_key": queryData.chat_name_key,
                "chat_store_key": chat_store_key,
            }
        }

        saveMemory(chat_store , queryData.chat_name_key , chat_store_key)
        # print(source_data)

        return source_data       

    

""" if __name__ == "__main__":
    result("Ποια δικαστίκη απόφαση περιλαμβάνει υπόθεση με αυτοκινητιστικό δυστήχημα? Και ποιοι ήταν οι άμεσα εμπλεκόμενοι? Και ποιος ήταν ο δικαστής?") """