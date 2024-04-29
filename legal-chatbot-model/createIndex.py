import logging
import sys

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
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.llms.openai import OpenAI
from llama_index.core import VectorStoreIndex , StorageContext , load_index_from_storage , Settings

def creatingIndex():
    nest_asyncio.apply()

    load_dotenv(find_dotenv(), override=True)
    os.environ["OPENAI_API_KEY"] = os.environ.get("OPENAI_API_KEY")
    openai.api_key = os.environ.get("OPENAI_API_KEY")

    from llama_index.core import SimpleDirectoryReader 
    documents = SimpleDirectoryReader("./Data" , filename_as_id=True).load_data()

    print(len(documents))
    
    """ Settings.llm = OpenAI(model="gpt-3.5-turbo")
    Settings.embed_model = OpenAIEmbedding(
        model_name="text-embedding-ada-002",
        embed_batch_size=30
    ) """

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

    # from llama_index.core.ingestion import IngestionPipeline

    # pipeline = IngestionPipeline(transformations=transformations)

    """ nodes = pipeline.run(
        documents=documents,
        in_place=True,
        show_progress=True,
    ) """

    """ print(len(nodes))
    print(nodes[1].metadata) """


    # service_context  = ServiceContext.from_defaults(transformations=transformations)

    """ import chromadb
    # chroma_client = chromadb.EphemeralClient()
    # chroma_collection = chroma_client.create_collection("Decision_1985-1995")

    db = chromadb.PersistentClient(path="./storage/chroma")
    chroma_collection = db.get_or_create_collection("Decision_1985-1995")

    vector_store = ChromaVectorStore(chroma_collection=chroma_collection)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)
    index = VectorStoreIndex.from_vector_store(vector_store=vector_store , service_context=service_context)
    # index = VectorStoreIndex.from_documents(documents , show_progress=True , storage_context=storage_context , transformations=transformations) """

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
