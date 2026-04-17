import React from 'react';

const PricingPanel = ({ currentPlan, onUpgrade, isUpgrading }) => {
    const plans = [
        { name: 'FREE', tokens: 100, rpm: 5 },
        { name: 'PRO', tokens: 1000, rpm: 20 },
        { name: 'ENTERPRISE', tokens: 10000, rpm: 60 }
    ];

    return (
        <div style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 10px 0', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Upgrade & Pricing</h3>
            <div style={{ display: 'flex', gap: '16px' }}>
                {plans.map(p => {
                    const isActive = currentPlan === p.name;
                    return (
                        <div key={p.name} style={{
                            flex: 1,
                            border: isActive ? '2px solid #007bff' : '1px solid #ccc',
                            padding: '16px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            backgroundColor: isActive ? '#f8f9fa' : 'white',
                            transition: 'all 0.2s ease-in-out'
                        }}>
                            <h4 style={{ margin: '0 0 8px 0', color: isActive ? '#007bff' : 'inherit' }}>{p.name}</h4>
                            <p style={{ margin: '4px 0', color: '#555' }}><strong>{p.tokens}</strong> tokens / month</p>
                            <p style={{ margin: '4px 0', color: '#555' }}><strong>{p.rpm}</strong> req / min max</p>
                            {p.name === 'FREE' ? (
                                <button
                                    disabled={true}
                                    style={{
                                        marginTop: '12px',
                                        padding: '8px 16px',
                                        width: '100%',
                                        backgroundColor: isActive ? '#6c757d' : '#e9ecef',
                                        color: isActive ? 'white' : '#6c757d',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'default'
                                    }}
                                >
                                    {isActive ? 'Current Plan' : 'Default Plan'}
                                </button>
                            ) : (
                                <button
                                    disabled={isActive || isUpgrading}
                                    onClick={() => onUpgrade(p.name)}
                                    style={{
                                        marginTop: '12px',
                                        padding: '8px 16px',
                                        width: '100%',
                                        backgroundColor: isActive ? '#6c757d' : '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: isActive ? 'default' : 'pointer',
                                        opacity: isUpgrading ? 0.7 : 1
                                    }}
                                >
                                    {isActive ? 'Current Plan' : `Upgrade to ${p.name}`}
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PricingPanel;
