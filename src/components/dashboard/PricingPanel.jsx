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
                    let planColor = p.name === 'FREE' ? '#5cb85c' // Green
                                  : p.name === 'PRO' ? '#007bff' // Blue
                                  : '#f39c12'; // Orange/Gold for ENTERPRISE
                    
                    return (
                        <div key={p.name} style={{
                            flex: 1,
                            border: isActive ? `2px solid ${planColor}` : `1px solid ${planColor}60`,
                            padding: '16px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            backgroundColor: isActive ? `${planColor}12` : 'white',
                            transition: 'all 0.2s ease-in-out'
                        }}>
                            <h4 style={{ margin: '0 0 8px 0', color: planColor }}>{p.name}</h4>
                            <p style={{ margin: '4px 0', color: '#555' }}><strong>{p.tokens}</strong> tokens / month</p>
                            <p style={{ margin: '4px 0', color: '#555' }}><strong>{p.rpm}</strong> req / min max</p>
                            {p.name === 'FREE' ? (
                                <button
                                    disabled={isActive || isUpgrading}
                                    onClick={() => onUpgrade(p.name)}
                                    style={{
                                        marginTop: '12px',
                                        padding: '8px 16px',
                                        width: '100%',
                                        backgroundColor: isActive ? '#6c757d' : planColor,
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: isActive ? 'default' : 'pointer',
                                        opacity: isUpgrading && !isActive ? 0.7 : 1
                                    }}
                                >
                                    {isActive ? 'Current Plan' : 'Downgrade to FREE'}
                                </button>
                            ) : (
                                <button
                                    disabled={isActive || isUpgrading}
                                    onClick={() => onUpgrade(p.name)}
                                    style={{
                                        marginTop: '12px',
                                        padding: '8px 16px',
                                        width: '100%',
                                        backgroundColor: isActive ? '#6c757d' : planColor,
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: isActive ? 'default' : 'pointer',
                                        opacity: isUpgrading && !isActive ? 0.7 : 1
                                    }}
                                >
                                    {isActive ? 'Current Plan' : (
                                        ['PRO', 'ENTERPRISE'].indexOf(p.name) < ['FREE', 'PRO', 'ENTERPRISE'].indexOf(currentPlan) 
                                            ? `Downgrade to ${p.name}` 
                                            : `Upgrade to ${p.name}`
                                    )}
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
