from llama_index.llms.ollama import Ollama

llm = Ollama(model="ilsp/meltemi-instruct")

response = llm.complete("Translate this phrase to Greek ( The court's judgment, which dismissed the appeal, was delivered by Judge LOIZOU J. The case involved a motor-car collision on the Akaki - Kokkinotrimithia road on May 19, 1982. )")

print(response)