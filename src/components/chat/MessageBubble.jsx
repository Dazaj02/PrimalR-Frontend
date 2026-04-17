import React from 'react';

const MessageBubble = ({ text, isUser }) => {
    const align = isUser ? 'flex-end' : 'flex-start';
    const bg = isUser ? '#007bff' : '#ececec';
    const color = isUser ? 'white' : 'black';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: align, margin: '8px 0' }}>
            <div style={{
                background: bg,
                color: color,
                padding: '10px 16px',
                borderRadius: '16px',
                maxWidth: '75%',
                wordWrap: 'break-word'
            }}>
                {text}
            </div>
        </div>
    );
};

export default MessageBubble;
