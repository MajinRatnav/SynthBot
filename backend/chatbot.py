import os
import json
import shutil
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai.types import HttpOptions

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY"),
    http_options=HttpOptions(api_version="v1")
)

# Updated for broader compatibility
MODEL_PRIORITY = [
    "gemini-2.5-flash",        # Current stable 2026 standard
    "models/gemini-1.5-flash", # Reliable fallback
    "gemini-2.5-flash-lite"    # High-quota fallback
]

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Define supported types and map them to Gemini mime_types
    allowed_types = {
        ".pdf": "application/pdf",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".webp": "image/webp"
    }
    
    file_ext = os.path.splitext(file.filename.lower())[1]
    if file_ext not in allowed_types:
        raise HTTPException(status_code=400, detail="Unsupported format. Use PDF or Images.")
    
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # FIX: Removed 'path=' keyword which caused your error
        uploaded_file = client.files.upload(file=temp_path)
        print(f"📡 File Linked: {uploaded_file.name}")
        
        os.remove(temp_path)
        
        return {
            "file_uri": uploaded_file.uri, 
            "display_name": file.filename,
            "mime_type": allowed_types[file_ext] 
        }
    except Exception as e:
        if os.path.exists(temp_path): os.remove(temp_path)
        raise HTTPException(status_code=500, detail=str(e))

class ChatRequest(BaseModel):
    message: str
    file_uri: str = None
    mime_type: str = "application/pdf" # Default fallback

@app.post("/chat")
def chat(request: ChatRequest):
    def event_generator():
        success = False
        # Setup multi-part content
        contents = [request.message if request.message else "Analyze attached data."]
        
        if request.file_uri:
            contents.append({
                "file_data": {
                    "file_uri": request.file_uri, 
                    "mime_type": request.mime_type
                }
            })

        for model_id in MODEL_PRIORITY:
            try:
                response = client.models.generate_content_stream(
                    model=model_id,
                    contents=contents 
                )
                
                for chunk in response:
                    if chunk.text:
                        success = True
                        yield f"data: {json.dumps({'text': chunk.text})}\n\n"
                
                if success: break
            except Exception as e:
                print(f"❌ {model_id} failed: {str(e)[:50]}")
                continue

    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)