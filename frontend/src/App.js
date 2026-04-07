import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const animatedBgStyle = {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    color: 'white',
    background: 'linear-gradient(135deg, #0055ff, #00d4ff, #ff00ff, #8000ff, #0055ff)',
    backgroundSize: '400% 400%',
    animation: 'gradientFlow 15s ease infinite',
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Updated to port 8000 for FastAPI
      const response = await fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
      const data = await response.json();
      const botText = data.reply || "Error: Received empty response.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Error: Server unreachable." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={animatedBgStyle}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&display=swap');

          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes glitch-periodic {
            0%, 10% { 
              text-shadow: 2px 0 #ff00ff, -2px 0 #00d4ff; 
              clip-path: inset(40% 0 61% 0); 
              transform: translate(-2px, 2px); 
              opacity: 1;
            }
            2%, 8% { 
              text-shadow: -2px 0 #ff00ff, 2px 0 #00d4ff; 
              clip-path: inset(92% 0 1% 0); 
              transform: translate(1px, -1px); 
            }
            4%, 6% { 
              text-shadow: 2px 0 #ff00ff, -2px 0 #00d4ff; 
              clip-path: inset(43% 0 1% 0); 
              transform: translate(-1px, 2px); 
            }
            11%, 100% { 
              text-shadow: none; 
              clip-path: inset(0 0 0 0); 
              transform: translate(0); 
              opacity: 0;
            }
          }

          .glitch-wrapper {
            position: relative;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
          }

          .glitch-text {
            font-family: 'Orbitron', sans-serif;
            font-style: italic;
            color: #fcee0a;
            font-size: 4rem;
            font-weight: 900;
            text-transform: uppercase;
            position: relative;
            letter-spacing: 4px;
            margin: 0;
            text-shadow: 0 0 15px rgba(252, 238, 10, 0.6);
            /* Cyberpunk notch effect */
            clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 90% 100%, 0% 100%);
          }

          .glitch-text::before, .glitch-text::after {
            content: "SynthBot";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            font-family: 'Orbitron', sans-serif;
          }

          .glitch-text::before {
            left: 3px;
            text-shadow: -3px 0 #ff00ff;
            animation: glitch-periodic 5s infinite linear;
          }

          .glitch-text::after {
            left: -3px;
            text-shadow: 3px 0 #00d4ff;
            animation: glitch-periodic 5s infinite linear;
            animation-delay: 0.1s;
          }
        `}
      </style>

      <div className="glitch-wrapper">
        <h1 className="glitch-text">
          SynthBot
        </h1>
      </div>
      
      <div style={{ 
        maxWidth: '700px', 
        margin: '0 auto', 
        background: 'rgba(15, 15, 15, 0.9)', 
        borderRadius: '15px', 
        padding: '25px', 
        boxShadow: '0 15px 50px rgba(0,0,0,0.9)', 
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(252, 238, 10, 0.3)'
      }}>
        <div style={{ height: '400px', overflowY: 'auto', marginBottom: '20px', paddingRight: '10px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: '20px', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
              <div style={{ 
                display: 'inline-block', 
                padding: '12px 20px', 
                borderRadius: '12px', 
                backgroundColor: msg.role === 'user' ? '#fcee0a' : '#1a1a1a', 
                color: msg.role === 'user' ? '#000' : '#00d4ff',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.9rem',
                border: msg.role === 'user' ? 'none' : '1px solid #00d4ff',
                boxShadow: msg.role === 'user' ? '0 0 15px rgba(252, 238, 10, 0.3)' : '0 0 10px rgba(0, 212, 255, 0.2)',
                maxWidth: '85%',
                wordWrap: 'break-word'
              }}>
                <span style={{ fontWeight: '900', fontSize: '0.7rem', display: 'block', marginBottom: '4px', opacity: 0.7 }}>
                  {msg.role === 'user' ? 'YOU' : 'ALT'}
                </span>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <p style={{ color: '#fcee0a', fontWeight: 'bold', fontFamily: 'Orbitron', fontSize: '0.8rem' }}>
              [ EVALUATING... ]
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input 
            style={{ 
              flex: 1, 
              padding: '14px', 
              borderRadius: '4px', 
              border: '1px solid #333', 
              fontSize: '14px', 
              backgroundColor: '#000', 
              color: '#fcee0a',
              fontFamily: 'monospace',
              outline: 'none'
            }}
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="You look lonely...I can fix that :)" 
          />
          <button 
            onClick={handleSend} 
            style={{ 
              padding: '12px 30px', 
              backgroundColor: '#fcee0a', 
              color: 'black',
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer', 
              fontWeight: '900',
              fontFamily: 'Orbitron, sans-serif',
              textTransform: 'uppercase',
              clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)'
            }}
          >
            Execute
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;