import logging
import sys
from createIndexNew import creatingIndexNew
from memory_chat import getMemory , saveMemory


logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))
import os
from dotenv import load_dotenv, find_dotenv
import openai
import nest_asyncio

from llama_index.core.prompts import PromptTemplate
from llama_index.llms.huggingface import HuggingFaceInferenceAPI , HuggingFaceLLM
from llama_index.embeddings.langchain import LangchainEmbedding
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from llama_index.core import Settings


from huggingface_hub import login
from llama_index.llms.ollama import Ollama

from llama_index.llms.openai import OpenAI
from llama_index.embeddings.openai import OpenAIEmbedding


if __name__ == "__main__":

    # query = "Ποια δικαστίκη απόφαση περιλαμβάνει υπόθεση με αυτοκινητιστικό δυστήχημα? Και ποιοι ήταν οι άμεσα εμπλεκόμενοι? Και ποιος ήταν ο δικαστής?"
    nest_asyncio.apply()

    load_dotenv(find_dotenv(), override=True)
    os.environ["HUGGINGFACE_API_KEY"] = os.environ.get("HUGGINGFACE_API_KEY")
    login(token=os.environ.get("HUGGINGFACE_API_KEY"))

    os.environ["OPENAI_API_KEY"] = os.environ.get("OPENAI_API_KEY")
    openai.api_key = os.environ.get("OPENAI_API_KEY")

    """ llm = HuggingFaceInferenceAPI(
        model_name="HuggingFaceH4/zephyr-7b-beta",
        api_key=os.environ["HUGGINGFACE_API_KEY"]
    ) """  

    # llm = Ollama(model="mistral")
    # llm = Ollama(model="llama3")

    # llm = Ollama(model="ilsp/meltemi-instruct")

    llm = OpenAI(model="gpt-3.5-turbo")
    embed_model = OpenAIEmbedding(
        model_name="text-embedding-ada-002",
        embed_batch_size=30
    )

    """ tokenizer = AutoTokenizer.from_pretrained("ilsp/Meltemi-7B-v1")
    llm = HuggingFaceLLM(model_name="ilsp/Meltemi-7B-v1" , tokenizer=tokenizer) """

    """ llm = HuggingFaceInferenceAPI(
        api_key=os.environ["HUGGINGFACE_API_KEY"],
        model_name="timpal0l/mdeberta-v3-base-squad2",
    ) """


    """ embed_model = LangchainEmbedding(
        HuggingFaceInferenceAPIEmbeddings(
            api_key=os.environ["HUGGINGFACE_API_KEY"],
            model_name="intfloat/multilingual-e5-large",
        )
    ) """

    """ embed_model = LangchainEmbedding(
        HuggingFaceInferenceAPIEmbeddings(
            api_key=os.environ["HUGGINGFACE_API_KEY"],
            model_name="intfloat/multilingual-e5-large"
        )
    ) """

    Settings.llm = llm
    Settings.embed_model = embed_model

    index = creatingIndexNew()

    text_qa_template_str = (
        "You are a Cypriot legal assistant that you have trained on the Cyprus legal decisions for the years 1985 to 1995.\n"
        "Always answer the query only using the provided context information, "
        "and not prior knowledge.\n"
        "Some rules to follow:\n"
        "1. Never directly reference the given context in your answer.\n"
        "2. Avoid statements like 'Based on the context, ...' or "
        "3. Always answer the question based on the language used in the question"
        "'The context information ...' or anything along "
        "those lines."
        "Context information is below.\n"
        "---------------------\n"
        "{context_str}\n"
        "---------------------\n"
        "Answer the question: {query_str}\n"
    )

    """ text_qa_template_str = (
        "Είστε ένας Κύπριος νομικός βοηθός που έχετε εκπαιδευτεί στις νομικές αποφάσεις της Κύπρου για τα έτη 1985 έως 1995."
        "Να απαντάτε πάντα στο ερώτημα χρησιμοποιώντας μόνο τις παρεχόμενες πληροφορίες του context, "
        "και όχι προηγούμενες γνώσεις.\n"
        "Μερικοί κανόνες που πρέπει να ακολουθήσετε:\n"
        "1. Ποτέ μην αναφέρεστε άμεσα στο δεδομένο context στην απάντησή σας.\n"
        "2. Αποφύγετε δηλώσεις όπως “Με βάση το context, ...” ή "
        "3. Να απαντάτε πάντα στην ερώτηση με βάση τη γλώσσα που χρησιμοποιείται στην ερώτηση {query_str}"
        "“Οι πληροφορίες του context ...” ή οτιδήποτε άλλο κατά μήκος "
        "αυτές τις γραμμές."
        "Οι πληροφορίες του πλαισίου είναι παρακάτω.\n"
        "---------------------\n"
        "{context_str}\n"
        "---------------------\n"
        "Απαντήστε στην ερώτηση: {query_str}\n"
    ) """

    query = "Ποια δικαστική υπόθεση περιλαμβάνει οδικό δυστήχημα και ποιοι ήταν οι δικαστές?"
    # query = "What judicial decision involves a traffic accident and who were presiding judge?"
    text_qa_template = PromptTemplate(text_qa_template_str)
    chat_engine = index.as_chat_engine(chat_mode="condense_question", text_qa_template=text_qa_template , verbose=True , llm=llm)
    
    response = chat_engine.chat(query)
    # print("MEMORY AFTER " , memory[""] ,"\n\n")

    # print("MEMORY AFTER CHAT STORE" , memory.chat_store ,"\n\n")

    # print(chat_messages_list)
    # print(chat_store_key)

    print("Response" , "\n" , response.response)
    sources = response.source_nodes

    for source in sources:
        metadata = source.metadata
        file_name = metadata['file_name']
        file_path = metadata['file_path']
        questions_this_excerpt_can_answer = metadata["questions_this_excerpt_can_answer"]
        
        source_data = {
            "response_data": {
                "response": response.response,
                "file_name": file_name,
                "file_path": file_path,
                "questions_this_excerpt_can_answer": questions_this_excerpt_can_answer
            }
        }

        # saveMemory(chat_store , queryData.chat_name_key , chat_store_key)
        # print(source_data)

    
