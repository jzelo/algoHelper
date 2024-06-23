from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

model_name = './model'
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

@app.route('/ask', methods=['POST'])
def ask():
    logging.debug("Received request: %s", request.json)
    question = request.json['question']
    inputs = tokenizer.encode(question, return_tensors='pt')
    
    # Generate the response with specific parameters to prevent repetition
    outputs = model.generate(
        inputs,
        max_length=500,
        num_return_sequences=1,
        no_repeat_ngram_size=2,
        temperature=0.7,
        top_p=0.9
    )
    
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    logging.debug("Generated answer: %s", answer)
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)