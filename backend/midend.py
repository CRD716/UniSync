from llama_cpp import Llama
from flask import Flask,request,jsonify

#llama setup
llm = Llama(model_path="backend/models/marcoroni-13b.Q4_K_S.gguf", n_ctx=4096, low_vram=True)

app = Flask(__name__)

masterdict = {
  "AAAAAA": {
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
    data = request.get_json()

    return jsonify(data), 201

@app.route("/gennotes/<teamid>")
def gennotes(teamid):
    if (not teamid in masterdict.values()):
        return "Invalid teamid", 404
    
    concatedString = ""
    print(masterdict.get(teamid))
    for key in masterdict.get(teamid):
        print(key)
        concatedString += masterdict.get(teamid).get(key).get("txt")
    prompt = "### Instruction:\n"+"Summarize and combine the following notes from multiple people."+"\nWrite the word \"END\" when you complete the task."+concatedString+"\n### Response:\n"
    output = llm(prompt, max_tokens=128, temperature=0.3, mirostat_mode=2, stop=["END"], echo=True)
    print(output)
    return output, 200

#debug api
@app.route("/generate/<prompt>")
def generate(prompt):
    prompt = "### Instruction:\n"+prompt+"\nWrite the word \"END\" when you complete the task."+"\n### Response:\n"

    output = llm(prompt, max_tokens=256, temperature=0.4, mirostat_mode=2, stop=["END"], echo=True)
    print(output)
    return output, 200

app.run(debug=True, use_reloader=False)