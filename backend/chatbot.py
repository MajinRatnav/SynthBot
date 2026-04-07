import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai

# 1. Load the API key from .env
load_dotenv()

app = Flask(__name__)
CORS(app)  # This allows your React app (on a different port) to talk to Python

# 2. Initialize Gemini
client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
chat_session = client.chats.create(model="gemini-2.5-flash")

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get("message")
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        # 3. Send message to Gemini and get response
        response = chat_session.send_message(user_message)
        
        # Check if text exists and use it, otherwise convert the whole response to string
        bot_text = response.text if hasattr(response, 'text') else str(response)
        
        print(f"Gemini says: {bot_text}") # This helps you debug in the terminal!
        return jsonify({"reply": bot_text})
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("🚀 Python Backend Engine running on http://127.0.0.1:5000")
    app.run(port=5000, debug=True)