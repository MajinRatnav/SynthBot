

Synthbot is a sophisticated, full-stack AI orchestrator built to provide high-reliability academic and healthcare assistance. Unlike standard chatbot wrappers, Synthbot implements a **graceful degradation (Step-Down) model** to ensure 100% service availability and features a **PDF context-injection pipeline** for document-specific analysis.



---

##  Key Features

* **Multi-Tier Fault Tolerance:** A custom "Step-Down" orchestrator that automatically shifts model versions (Gemini 2.5 Flash → 2.0 → 1.5) to manage API rate-limiting and token exhaustion without service interruption.
* **Intelligent PDF Processing:** Integrated parsing engine that extracts, cleans, and structures data from user-uploaded PDFs for real-time context-aware queries.
* **Production Latency:** Optimized for speed, delivering responses in sub-2-second intervals using Gemini's latest Flash models.
* **User-Centric Design:** Successfully beta-tested and utilized by **40+ university peers** for academic research and study automation.

---

##  Tech Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Python , FastAPI
* **AI Engine:** Google Gemini API (2.5 Flash, 2.0, 1.5)
* **Deployment:** Vercel (CI/CD)
* **Libraries:** PDF-lib /  dotenv

---

##  System Architecture

Synthbot follows a modular architecture designed for scalability and reliability:

1.  **Client Layer:** User uploads documents and sends queries via a responsive React interface.
2.  **Orchestration Layer:** A FastAPI middleware manages model fallback logic and monitors API health.
3.  **Data Processing:** PDF text is cleaned and injected into the prompt context to ground the AI's responses in specific document data.

---

## 🏁 Getting Started

### Prerequisites
* Node.js installed
* A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/MajinRatnav/Synthbot.git](https://github.com/MajinRatnav/SynthBot.git)
2. Run npm install:
 ```bash
   npm install
```
3. Create .env file and paste the following:
GEMINI_API_KEY=your_key_here
PORT=5000

4. Start npm:
npm start
   
