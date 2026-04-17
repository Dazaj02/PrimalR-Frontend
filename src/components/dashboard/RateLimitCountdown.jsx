import React, { useEffect, useState } from 'react';

const RateLimitCountdown = ({ timer, rpmLimit, requestsThisMinute }) => {
    const [secondsToReset, setSecondsToReset] = useState(60 - new Date().getSeconds());

    useEffect(() => {
        const interval = setInterval(() => {
            const currentSeconds = new Date().getSeconds();
            setSecondsToReset(60 - currentSeconds);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span><strong>Requests Limit:</strong> {requestsThisMinute} / {rpmLimit} per minute</span>
                <span style={{ color: '#888' }}>Resets in {secondsToReset}s</span>
            </div>
            {timer > 0 && (
                <div style={{
                    padding: '16px',
                    backgroundColor: '#ffc107',
                    color: '#856404',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                }}>
                    Rate limit exceeded! Chat is disabled. Retrying in {timer} seconds...
                </div>
            )}
        </div>
    );
};

export default RateLimitCountdown;
