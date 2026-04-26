# 🤖 SynthBot: AI-Powered Multi-Modal Chatbot

**SynthBot** is a high-performance, full-stack AI application that allows users to interact with advanced language models to analyze documents and images. Built with a sleek, cyberpunk-inspired aesthetic, it features a real-time streaming interface and a robust backend with automated model failover.

🚀 **[Live Demo](https://synth-bot-eight.vercel.app/)**( the first reply may take a while since its deployed on render free tier, usually takes 10 seconds to wake up) 

---

## ✨ Features

* **Multi-Modal Analysis**: Seamlessly upload and analyze PDFs and images (JPG, PNG, WebP) using the Google Gemini API.
* **Real-Time Streaming**: Implements `StreamingResponse` for token-by-token text generation, providing a modern, low-latency chat experience.
* **Intelligent Model Priority**: Features a custom failover logic (`Gemini 2.5 Flash` → `1.5 Flash` → `Lite`) to ensure high availability during API quota fluctuations.
* **Cyberpunk UI/UX**: A highly stylized React interface featuring animated diagonal gradients, periodic glitch text effects, and custom-clipped "Cyber-Yellow" components.
* **Production Ready**: Fully deployed with a split-stack architecture (Vercel for Frontend, Render for Backend) and managed CORS security.

---

## 🛠️ Technical Stack

### **Frontend**
* **Framework**: React.js
* **Styling**: Modern CSS3 (Keyframes, Backdrop-filters, Orbitron Typography)
* **State Management**: React Hooks (`useState`, `useRef`) for stream handling and file management
* **Deployment**: Vercel

### **Backend**
* **Framework**: FastAPI (Python 3.10+)
* **AI Engine**: Google Generative AI (Gemini SDK)
* **Security**: CORS Middleware with dynamic `ALLOWED_ORIGINS`
* **Deployment**: Render

---

## 📐 Architecture & Engineering Highlights

### **The Model Failover Strategy**
To ensure reliability, the backend uses a `MODEL_PRIORITY` list. If the primary model hits a rate limit or returns an error, the system automatically catches the exception and attempts the request with the next best available model without the user ever knowing.

### **Stream Handling in React**
Instead of waiting for a full JSON response, the frontend uses the `ReadableStream` API. It parses incoming `data: ` chunks in real-time, updating the UI as the AI "thinks".

---

## 🚀 Installation & Local Setup

### **1. Clone the repository**
```bash
git clone [https://github.com/MajinRatnav/SynthBot.git](https://github.com/MajinRatnav/SynthBot.git)
cd SynthBot
```
### **2. Setup Backend**
```bash
cd backend
pip install -r requirements.txt
# Create .env file and add your API Key
echo "GOOGLE_API_KEY=your_key_here" > .env
python chatbot.py

```
### **3. Setup Frontend**
```bash
cd frontend
npm install
npm start

```
### **4. Setup Environment Variables**
create a .env file and paste ur google API key
GOOGLE_API_KEY=paste here with no spaces

