import React from 'react';

const PlanBadge = ({ plan }) => {
    let bgColor = '#6c757d'; // Gray for FREE
    if (plan === 'PRO') bgColor = '#007bff'; // Blue for PRO
    if (plan === 'ENTERPRISE') bgColor = '#ffc107'; // Gold

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
