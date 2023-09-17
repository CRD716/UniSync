from llama_cpp import Llama
from flask import Flask,request,jsonify

#llama setup
llm = Llama(model_path="backend/models/marcoroni-13b.Q4_K_S.gguf", n_ctx=4096, low_vram=True)

app = Flask(__name__)

masterdict = {
  "AAAAA": {
      "post1": {
        "name" : "john doe",
        "txt" : "In the beginning God created the heavens and the earth."
      },
      "post2" : {
        "name" : "jane doe",
        "txt" : "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters."
      }
  }
}

@app.route("/submit-text", methods=["POST"])
def submittext():
    # incoming as giant text block, add instructions
    prompt = "### Instruction:\nSummarize the following collection of notes.\n"


#debug api
@app.route("/generate/<prompt>")
def generate(prompt):
    prompt = "### Instruction:\n"+prompt+"\n### Response:\n"

    output = llm(prompt, max_tokens=256, temperature=0.5, mirostat_mode=2, stop=["\n"], echo=True)
    print(output)
    return output, 200

app.run(debug=True)