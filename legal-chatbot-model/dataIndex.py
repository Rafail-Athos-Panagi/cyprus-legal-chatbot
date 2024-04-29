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

import torch


from llama_index.core.node_parser import TokenTextSplitter
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.llms.openai import OpenAI
from llama_index.core import VectorStoreIndex , StorageContext , load_index_from_storage , Settings

from llama_index.llms.ollama import Ollama

from llama_index.embeddings.openai import OpenAIEmbedding
import transformers
from transformers import AutoTokenizer
from llama_index.core.ingestion import IngestionPipeline


from llama_index.llms.huggingface import (
    HuggingFaceInferenceAPI,
    HuggingFaceLLM,
)

from llama_index.embeddings.langchain import LangchainEmbedding
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings

if __name__ == "__main__":
    nest_asyncio.apply()

    """ load_dotenv(find_dotenv(), override=True)
    os.environ["OPENAI_API_KEY"] = os.environ.get("OPENAI_API_KEY")
    openai.api_key = os.environ.get("OPENAI_API_KEY") """

    from llama_index.core import SimpleDirectoryReader 
    documents = SimpleDirectoryReader("./Data" , filename_as_id=True).load_data()

    Settings.llm = Ollama(model="ilsp/meltemi-instruct" , request_timeout=60 , context_window=8192)

    """ Settings.embed_model = OpenAIEmbedding(
        model_name="text-embedding-ada-002",
        api_key="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",
        embed_batch_size=30,
        max_retries=5
    ) """

    Settings.embed_model = LangchainEmbedding(
        HuggingFaceInferenceAPIEmbeddings(
            api_key="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",
            model_name="intfloat/multilingual-e5-large",
        )
    )

    print(len(documents))

    """ text_splitter = TokenTextSplitter(
        separator=" ", chunk_size=1036, chunk_overlap=500
    ) """

    text_splitter = TokenTextSplitter(
        separator=" ", chunk_size=700, chunk_overlap=324
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

    try:
        # load from index
        storage_context = StorageContext.from_defaults(persist_dir="./storage/cache/sample3/")
        index = load_index_from_storage(storage_context , extra_info_field='metadata')
        print("loading from disk")
        # return index

    except:
        # creating the index
        index = VectorStoreIndex.from_documents(documents , show_progress=True , extra_info_field='metadata')
        index.storage_context.persist(persist_dir="./storage/cache/sample3/")    
        print("persisting to disk")
        # return index
