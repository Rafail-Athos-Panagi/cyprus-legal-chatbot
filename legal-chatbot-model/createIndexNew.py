import logging
import sys
import time
import random
import requests

logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))
import os
from dotenv import load_dotenv, find_dotenv
import openai
import nest_asyncio

from llama_index.core.extractors import (
    TitleExtractor,
    QuestionsAnsweredExtractor,
    KeywordExtractor,
    SummaryExtractor,
)

from llama_index.core.node_parser import TokenTextSplitter
from llama_index.core import VectorStoreIndex, StorageContext, load_index_from_storage, Settings

from llama_index.llms.huggingface import HuggingFaceInferenceAPI , HuggingFaceLLM
from llama_index.embeddings.langchain import LangchainEmbedding
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings

from huggingface_hub import login
from llama_index.llms.ollama import Ollama

from llama_index.embeddings.openai import OpenAIEmbedding
from tenacity import (
    retry,
    stop_after_attempt,
    wait_random_exponential
)

###############

# ΝΑ ΒΑΛΩ ΕΝΑ INPUT ΤΟ ΟΠΟΙΟ ΘΑ ΜΠΟΡΕΙ ΚΑΠΟΙΟΣ ΝΑ ΓΡΑΦΕΙ ΜΙΑ ΣΥΓΚΕΚΡΙΜΕΝΗ ΛΕΞΗ ΣΑΝ KEYWORD ΓΙΑ ΝΑ ΨΑΞΕΙ ΚΑΤΙ
# ΝΑ ΜΠΟΥΝ ΣΑΝ ΜΕΤΑΔΕΔΟΜΕΝΑ ΕΤΟΣ ΚΑΙ ΤΥΠΟΣ ( 1 , 2 , 3 , 4 ) ΚΑΤΙ ΣΑΝ FILTERING ΓΙΑ ΤΟ ΠΑΝΩ INPUT

###############

@retry(wait=wait_random_exponential(min=1, max=60), stop=stop_after_attempt(100))
def getIndex(documents , transformations):
    try:
        # load from index
        storage_context = StorageContext.from_defaults(persist_dir="./storage/cache/gptSample/")
        index = load_index_from_storage(storage_context , extra_info_field='metadata')
        print("loading from disk")
        return index

    except:
        # creating the index
        index = VectorStoreIndex.from_documents(documents , show_progress=True , transformations=transformations , extra_info_field='metadata')
        index.storage_context.persist(persist_dir="./storage/cache/gptSample/")    
        print("persisting to disk")
        return index

if __name__ == "__main__":
    nest_asyncio.apply()

    load_dotenv(find_dotenv(), override=True)
    """ os.environ["HUGGINGFACE_API_KEY"] = os.environ.get("HUGGINGFACE_API_KEY")
    login(token=os.environ.get("HUGGINGFACE_API_KEY")) """

    os.environ["OPENAI_API_KEY"] = os.environ.get("OPENAI_API_KEY")
    openai.api_key = os.environ.get("OPENAI_API_KEY")

    # llm = Ollama(model="mistral")
    # llm = Ollama(model="ilsp/meltemi-instruct")

    # Settings.llm = OpenAI(model="gpt-3.5-turbo")
    embed_model = OpenAIEmbedding(
        model_name="text-embedding-ada-002",
    )

    """ tokenizer = AutoTokenizer.from_pretrained("ilsp/Meltemi-7B-v1")
    llm = HuggingFaceLLM(model_name="ilsp/Meltemi-7B-v1" , tokenizer=tokenizer) """

    """ llm = HuggingFaceInferenceAPI(
        api_key=os.environ["HUGGINGFACE_API_KEY"],
        model_name="timpal0l/mdeberta-v3-base-squad2",
    ) """

    """ embed_model = TextEmbeddingsInference(
        model_name="BAAI/bge-m3",  # required for formatting inference text,
        timeout=60,  # timeout in seconds
        embed_batch_size=10,  # batch size for embedding
    ) """

    """ embed_model = LangchainEmbedding(
        HuggingFaceInferenceAPIEmbeddings(
            api_key=os.environ["HUGGINGFACE_API_KEY"],
            model_name="intfloat/multilingual-e5-large",
        )
    ) """

    from llama_index.core import SimpleDirectoryReader
    documents = SimpleDirectoryReader("./Data", filename_as_id=True).load_data()

    text_splitter = TokenTextSplitter(
    separator=" ", chunk_size=1036, chunk_overlap=500    
)

    extractors = [
        TitleExtractor(nodes=5),
        QuestionsAnsweredExtractor(questions=3),
        KeywordExtractor(keywords=10),
        SummaryExtractor(summaries=["prev", "self"]),
    ]

    transformations = [text_splitter] + extractors
    Settings.transformations = transformations
    # Settings.llm = llm
    # Settings.embed_model = embed_model

    getIndex(documents , transformations)
    
