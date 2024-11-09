import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

# Instantiate FastAPI app
app = FastAPI()

load_dotenv()
# Authenticate with the OpenAI model using a personal access token
client = OpenAI(
    base_url="https://models.inference.ai.azure.com",
    api_key=os.getenv('SECRET_KEY')
)

# Chat history will be maintained per request (session state management should be handled by the front-end)
class ChatRequest(BaseModel):
    message: str
    chat_history: list = []

# Endpoint to handle chat messages
@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    # Check if system message is in the chat history; add it if not present
    system_message = {
        "role": "system",
        "content": "You are LingoQuest, a helpful language learning assistant. If the user asks something unrelated to language learning, kindly remind them that you’re here to help with language learning."
    }
    
    # Initialize chat history with system message if empty
    chat_history = request.chat_history
    print(chat_history)
    if not chat_history or chat_history[0].get("role") != "system":
        chat_history.insert(0, system_message)

    # Add the user's message to the chat history
    chat_history.append({"role": "user", "content": request.message})

    # Call the model to get a response
    try:
        response = client.chat.completions.create(
            messages=chat_history,
            model="gpt-4o",
            temperature=1,
            max_tokens=2000,
            top_p=1
        )
        assistant_message = response.choices[0].message.content
        chat_history.append({"role": "assistant", "content": assistant_message})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"response": assistant_message, "chat_history": chat_history}
