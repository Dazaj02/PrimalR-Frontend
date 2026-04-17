import React from 'react';

const UsageHistoryChart = ({ history }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <h3>Usage History (Last 7 Days - Tokens)</h3>
            <div style={{ display: 'flex', gap: '8px', height: '100px', alignItems: 'flex-end', borderBottom: '1px solid #ccc' }}>
                {history.map((val, idx) => (
                    <div key={idx} style={{
                        width: '30px',
                        height: `${Math.min(val / 10, 100)}%`, // Mock visual scale
                        backgroundColor: '#17a2b8',
                        color: 'white',
                        textAlign: 'center',
                        fontSize: '0.6rem'
                    }}>
                        {val}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsageHistoryChart;
