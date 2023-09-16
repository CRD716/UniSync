from llama_cpp import Llama
llm = Llama(model_path="backend/models/marcoroni-13b.Q4_K_S.gguf")

output = llm("Q: Name the planets in the solar system? A: ", max_tokens=64, stop=["Q:", "\n"], echo=True)

print(output)