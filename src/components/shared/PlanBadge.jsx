import React from 'react';

const PlanBadge = ({ plan }) => {
    let bgColor = '#5cb85c'; // Green for FREE
    if (plan === 'PRO') bgColor = '#007bff'; // Blue for PRO
    if (plan === 'ENTERPRISE') bgColor = '#f39c12'; // Orange/Gold for ENTERPRISE

    return (
        <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            backgroundColor: bgColor,
            color: 'white',
            fontWeight: 'bold',
            marginLeft: '12px'
        }}>
            {plan} PLAN
        </span>
    );
};

export default PlanBadge;
