from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

templates = [
    {
        "inputs": 11,
        "question": "What word is spelled incorrectly in every single dictionary?",
        "word": "Incorrectly"
    },
    {
        "inputs": 3,
        "question": "What goes up but never down?",
        "word": "Age"
    },
    {
        "inputs": 3,
        "question": "I have one head, one foot, and four legs. What am I?",
        "word": "bed"
    },
    {
        "inputs": 4,
        "question": "I have teeth but cant eat. What am I?",
        "word": "comb"
    },
    {
        "inputs": 5,
        "question": "What gets wetter the more it dries?",
        "word": "towel"
    },
    {
        "inputs": 7,
        "question": "What can be broken but never held? ",
        "word": "promise"
    },
]

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/get-template")
def get_template():
  return jsonify({
        "status": "success",
        "word": random.choice(templates)
  })

if __name__ == '__main__':
  app.run()