import React, { useState } from 'react';
import MessageBubble from './MessageBubble';
import TokenEstimator from './TokenEstimator';

const ChatInterface = ({ onGenerate, loading, rateLimitTimer, needsUpgrade }) => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt || loading || rateLimitTimer > 0 || needsUpgrade) return;

        const currentPrompt = prompt;
        setMessages((prev) => [...prev, { text: currentPrompt, isUser: true }]);
        setPrompt(''); // clear input early

        try {
            const responseText = await onGenerate(currentPrompt);
            setMessages((prev) => [...prev, { text: responseText, isUser: false }]);
        } catch (error) {
            console.error(error); // Error UI handled at top-level
        }
    };

    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px'
        }}>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
                {messages.map((msg, i) => (
                    <MessageBubble key={i} {...msg} />
                ))}
                {loading && <div style={{ color: '#888' }}>Wait, simulating AI generated text...</div>}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <TokenEstimator promptText={prompt} />
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={loading || rateLimitTimer > 0 || needsUpgrade}
                        placeholder="Type prompt..."
                        style={{ flex: 1, padding: '12px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <button
                        type="submit"
                        disabled={loading || !prompt || rateLimitTimer > 0 || needsUpgrade}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: rateLimitTimer > 0 ? '#dc3545' : '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: (loading || !prompt || rateLimitTimer > 0) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;
