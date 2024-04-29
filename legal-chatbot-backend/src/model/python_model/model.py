import json
import logging
import node
import sys
from creating_index import *

logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))

from llama_index.core.prompts import PromptTemplate
import os
from dotenv import load_dotenv, find_dotenv
import openai
import nest_asyncio



if __name__ == "__main__":
    
    nest_asyncio.apply()

    load_dotenv(find_dotenv(), override=True)
    os.environ["OPENAI_API_KEY"] = os.environ.get("OPENAI_API_KEY")
    openai.api_key = os.environ.get("OPENAI_API_KEY")

    node.log("continue")
    index = process_data()
    node.log("continue 1")

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
    
    text_qa_template = PromptTemplate(text_qa_template_str)
    chat_engine = index.as_chat_engine(chat_mode="condense_question", text_qa_template=text_qa_template , verbose=True)
    data = node.recieve()
    node.log("QUERY" , data)
    # query = data["query"]
    query = "Ποια δικαστίκη απόφαση περιλαμβάνει υπόθεση με αυτοκινητιστικό δυστήχημα? Και ποιοι ήταν οι άμεσα εμπλεκόμενοι? Και ποιος ήταν ο δικαστής?"
    response = chat_engine.chat(query)
    node.log(response) 
    sources = response.source_nodes
    data_json = []

    for source in sources:
        metadata = source.metadata
        file_name = metadata['file_name']
        file_path = metadata['file_path']
        questions_this_excerpt_can_answer = metadata["questions_this_excerpt_can_answer"]
        # node.log("File_Name" , file_name , "\n")
        # node.log("File_Path" , file_path , "\n")
        # node.log("questions_this_excerpt_can_answer" , questions_this_excerpt_can_answer , "\n")
        data_json.insert(0 , response.response)
        data_json.insert(1 , file_name)
        data_json.insert(2 , file_path)
        data_json.insert(3 , questions_this_excerpt_can_answer)

    node.log(data_json[1])
    node.emit(data_json)
