import React from 'react';

const TokenEstimator = ({ promptText }) => {
    // Estimating chars / 4
    const estimatedCost = Math.ceil(promptText.length / 4) + 10;
    
    return (
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px' }}>
            Estimated completion cost: <strong>{promptText.length === 0 ? 0 : estimatedCost} tokens</strong>
        </div>
    );
};

export default TokenEstimator;
