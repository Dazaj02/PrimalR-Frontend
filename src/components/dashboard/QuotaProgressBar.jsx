import React from 'react';

const QuotaProgressBar = ({ usedTokens, totalTokens }) => {
    const percentage = Math.min((usedTokens / totalTokens) * 100, 100);

    let color = '#28a745'; // Green
    if (percentage > 70) color = '#ffc107'; // Yellow
    if (percentage > 90) color = '#dc3545'; // Red

    return (
        <div style={{
            margin: '20px 0',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px'
        }}>
            <p><strong>Monthly Quota:</strong> {usedTokens} / {totalTokens} Tokens</p>
            <div style={{
                height: '24px',
                width: '100%',
                backgroundColor: '#eee',
                borderRadius: '12px',
                overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%',
                    width: `${percentage}%`,
                    backgroundColor: color,
                    transition: 'width 0.5s ease-in-out'
                }} />
            </div>
        </div>
    );
};

export default QuotaProgressBar;
