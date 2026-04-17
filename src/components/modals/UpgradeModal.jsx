import React, { useState, useEffect } from 'react';

const UpgradeModal = ({ isOpen, onClose, onUpgrade, isUpgrading, currentPlan, targetPlan, isExhausted }) => {
    const [step, setStep] = useState('prompt'); // prompt, form, processing, success

    const nextPlan = targetPlan || (currentPlan === 'FREE' ? 'PRO' : 'ENTERPRISE');
    const price = nextPlan === 'ENTERPRISE' ? 50 : 10;
    const isEnterpriseExhaustion = currentPlan === 'ENTERPRISE' && isExhausted;

    useEffect(() => {
        if (isOpen) setStep('prompt');
    }, [isOpen]);

    if (!isOpen) return null;

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setStep('processing');
        
        // Simular validación del banco e internet:
        setTimeout(() => {
            setStep('success');
            
            // Invocar el upgrade real en el sistema luego de la simulación "exitosa"
            setTimeout(() => {
                onUpgrade(nextPlan);
            }, 1500);
        }, 2000);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'white',
                padding: '32px',
                borderRadius: '12px',
                width: '400px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
            }}>
                
                {step === 'prompt' && (
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ color: isExhausted ? '#dc3545' : '#007bff', marginTop: 0 }}>
                            {isExhausted ? 'Quota Exhausted!' : 'Confirm Upgrade'}
                        </h2>
                        <p style={{ color: '#555', marginBottom: '24px' }}>
                            {isExhausted 
                                ? `You have reached your monthly token limit for the ${currentPlan || 'FREE'} plan.` + (isEnterpriseExhaustion ? ' Please contact support to increase your limits.' : ` You must upgrade to ${nextPlan} to continue using the AI generator.`)
                                : `You are about to upgrade your account from the ${currentPlan || 'FREE'} plan to the ${nextPlan} plan.`
                            }
                        </p>
                        {!isEnterpriseExhaustion && (
                            <button
                                onClick={() => setStep('form')}
                                style={{
                                    padding: '12px 24px',
                                    fontSize: '1.1rem',
                                    backgroundColor: isExhausted ? '#ffc107' : '#007bff',
                                    color: isExhausted ? '#000' : 'white',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    width: '100%'
                                }}
                            >
                                Upgrade to {nextPlan} for ${price}/mo
                            </button>
                        )}
                        <div style={{ marginTop: '16px' }}>
                            <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }} style={{ color: '#888', textDecoration: 'none' }}>Cancel</a>
                        </div>
                    </div>
                )}

                {step === 'form' && (
                    <div>
                        <h3 style={{ marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '12px' }}>Payment Simulator</h3>
                        <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '4px' }}>Cardholder Name</label>
                                <input required type="text" placeholder="John Doe" style={{ width: '94%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '4px' }}>Card Number</label>
                                <input required type="text" placeholder="0000 0000 0000 0000" maxLength="19" style={{ width: '94%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '4px' }}>Expiry</label>
                                    <input required type="text" placeholder="MM/YY" maxLength="5" style={{ width: '85%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '4px' }}>CVC</label>
                                    <input required type="text" placeholder="123" maxLength="4" style={{ width: '85%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                                </div>
                            </div>
                            <button
                                type="submit"
                                style={{
                                    marginTop: '16px',
                                    padding: '12px',
                                    fontSize: '1.2rem',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    borderRadius: '4px'
                                }}
                            >
                                Pay ${price}.00
                            </button>
                        </form>
                    </div>
                )}

                {step === 'processing' && (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <h3 style={{ color: '#007bff', margin: 0 }}>Processing Payment...</h3>
                        <p style={{ color: '#888', marginTop: '8px' }}>Contacting bank and securing your new quota.</p>
                    </div>
                )}

                {step === 'success' && (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{ fontSize: '48px', color: '#28a745', marginBottom: '16px' }}>✓</div>
                        <h3 style={{ color: '#28a745', margin: '0 0 8px 0' }}>Payment Successful!</h3>
                        <p style={{ color: '#555', margin: 0 }}>Upgrading your account to {nextPlan}...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpgradeModal;
