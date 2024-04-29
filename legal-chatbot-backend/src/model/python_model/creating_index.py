import logging
import node
import sys

logging.basicConfig(stream=sys.stdout, level=logging.INFO)
logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))

import os
from dotenv import load_dotenv, find_dotenv
import openai
import nest_asyncio

from llama_index.core import SimpleDirectoryReader

from llama_index.core import ServiceContext , VectorStoreIndex , StorageContext , load_index_from_storage

from llama_index.core.extractors import (
    TitleExtractor,
    QuestionsAnsweredExtractor,
    KeywordExtractor,
    SummaryExtractor,
)

from llama_index.core.node_parser import TokenTextSplitter

def process_data():
    nest_asyncio.apply()

    node.log("Shell Started")

    load_dotenv(find_dotenv(), override=True)
    os.environ["OPENAI_API_KEY"] = os.environ.get("OPENAI_API_KEY")
    openai.api_key = os.environ.get("OPENAI_API_KEY")

    documents = SimpleDirectoryReader("./src/model/python_model/Data" , filename_as_id=True).load_data()

    print(len(documents))

    # Settings.llm = OpenAI(model="gpt-3.5-turbo")
    # Settings.embed_model = OpenAIEmbedding(model="text-embedding-3-small")

    text_splitter = TokenTextSplitter(
        separator=" ", chunk_size=1024, chunk_overlap=200
    )

    extractors = [
        TitleExtractor(nodes=5),
        QuestionsAnsweredExtractor(questions=3),
        KeywordExtractor(keywords=10),
        SummaryExtractor(summaries=["prev", "self"]),
    ]

    transformations = [text_splitter] + extractors

    # Settings.transformations = transformations

    # from llama_index.core.ingestion import IngestionPipeline

    # pipeline = IngestionPipeline(transformations=transformations)

    """ nodes = pipeline.run(
        documents=documents,
        in_place=True,
        show_progress=True,
    ) """

    """ print(len(nodes))
    print(nodes[1].metadata) """


    service_context  = ServiceContext.from_defaults(transformations=transformations)

    try:
        # load from index
        storage_context = StorageContext.from_defaults(persist_dir="./src/model/python_model/storage/cache/sample/") 
        # storage_context = StorageContext.from_defaults(persist_dir="./storage/cache/sample/")   
        index = load_index_from_storage(storage_context , extra_info_field='metadata')
        print("loading from disk")
        return index

    except:
        # creating the index
        index = VectorStoreIndex.from_documents(documents , show_progress=True , service_context=service_context , extra_info_field='metadata')
        index.storage_context.persist(persist_dir="./storage/cache/sample/")    
        print("persisting to disk")
        return index

    