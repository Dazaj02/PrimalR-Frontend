import React, { useState, useEffect } from 'react';
import ChatInterface from './components/chat/ChatInterface';
import QuotaProgressBar from './components/dashboard/QuotaProgressBar';
import RateLimitCountdown from './components/dashboard/RateLimitCountdown';
import UsageHistoryChart from './components/dashboard/UsageHistoryChart';
import PricingPanel from './components/dashboard/PricingPanel';
import PlanBadge from './components/shared/PlanBadge';
import UpgradeModal from './components/modals/UpgradeModal';
import { useSubscriptionData } from './hooks/useSubscriptionData';

function App() {
  const {
      plan,
      usedTokens,
      totalTokens,
      requestsThisMinute,
      rpmLimit,
      loading,
      error,
      rateLimitTimer,
      needsUpgrade,
      generateText,
      upgradePlan,
      history
  } = useSubscriptionData();

  const [isModalOpenLocal, setIsModalOpenLocal] = useState(false);
  const [upgradeTarget, setUpgradeTarget] = useState(null);

  useEffect(() => {
      if (needsUpgrade) {
          setUpgradeTarget(plan === 'FREE' ? 'PRO' : 'ENTERPRISE');
          setIsModalOpenLocal(true);
      }
  }, [needsUpgrade, plan]);

  const handleCloseModal = () => {
      setIsModalOpenLocal(false);
      setUpgradeTarget(null);
  }
  
  const handleUpgrade = async (planToUpgradeTo) => {
      await upgradePlan(planToUpgradeTo);
      setIsModalOpenLocal(false);
      setUpgradeTarget(null);
  };

  const handleInitiateUpgrade = (planName) => {
      const plans = ['FREE', 'PRO', 'ENTERPRISE'];
      const currentIndex = plans.indexOf(plan);
      const targetIndex = plans.indexOf(planName);

      if (targetIndex < currentIndex) {
          // If downgrading, just call it directly (no payment simulator needed)
          handleUpgrade(planName);
      } else {
          setUpgradeTarget(planName);
          setIsModalOpenLocal(true);
      }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '16px' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
                PrimalR
                <PlanBadge plan={plan} />
            </h1>
        </header>

        <main style={{ marginTop: '20px' }}>
            <PricingPanel 
                currentPlan={plan} 
                onUpgrade={handleInitiateUpgrade}
                isUpgrading={loading}
            />

            <RateLimitCountdown 
                timer={rateLimitTimer} 
                rpmLimit={rpmLimit} 
                requestsThisMinute={requestsThisMinute} 
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                   <QuotaProgressBar usedTokens={usedTokens} totalTokens={totalTokens} />
                </div>
                <div>
                    <UsageHistoryChart history={history} />
                </div>
            </div>

            <ChatInterface 
                onGenerate={generateText}
                loading={loading}
                rateLimitTimer={rateLimitTimer}
                needsUpgrade={needsUpgrade}
            />

            {error && !needsUpgrade && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    {error}
                </div>
            )}
        </main>

        <UpgradeModal 
            isOpen={isModalOpenLocal} 
            onClose={handleCloseModal} 
            onUpgrade={handleUpgrade}
            isUpgrading={loading}
            currentPlan={plan}
            targetPlan={upgradeTarget}
            isExhausted={needsUpgrade}
        />
    </div>
  );
}

export default App;
