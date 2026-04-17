import { useState, useCallback, useEffect } from 'react';
import { apiClient } from '../services/apiClient';

export function useSubscriptionData() {
    const [plan, setPlan] = useState('FREE'); // Default visual assumption
    const [usedTokens, setUsedTokens] = useState(0); 
    const [totalTokens, setTotalTokens] = useState(100); // FREE limit default
    const [requestsThisMinute, setRequestsThisMinute] = useState(0);
    const [rpmLimit, setRpmLimit] = useState(5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rateLimitTimer, setRateLimitTimer] = useState(0);
    const [needsUpgrade, setNeedsUpgrade] = useState(false);

    const [history, setHistory] = useState([0,0,0,0,0,0,0]);

    // Start countdown timer for 429
    const startRateLimitCountdown = (seconds) => {
        setRateLimitTimer(seconds);
        const interval = setInterval(() => {
            setRateLimitTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const fetchStatus = useCallback(async () => {
        try {
            const status = await apiClient.getStatus();
            setPlan(status.plan);
            setUsedTokens(status.usedTokens);
            setTotalTokens(status.totalTokens);
            setRequestsThisMinute(status.requestsThisMinute);
            setRpmLimit(status.rpmLimit);
            if (status.usedTokens >= status.totalTokens) {
                setNeedsUpgrade(true);
            } else {
                setNeedsUpgrade(false);
            }
            
            // Also fetch history to keep charts synced
            const historyData = await apiClient.getUsageHistory();
            if (historyData) setHistory(historyData);
            
        } catch (err) {
            console.error("Failed fetching status", err);
        }
    }, []);

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    const generateText = useCallback(async (prompt) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiClient.generateText(prompt);
            await fetchStatus();
            return data.responseText;
        } catch (err) {
            if (err.status === 429) {
                setError(`Rate limit exceeded! Please wait ${err.retryAfter} seconds.`);
                startRateLimitCountdown(err.retryAfter);
            } else if (err.status === 402) {
                setError('Token quota exhausted for this month.');
                setNeedsUpgrade(true);
                await fetchStatus();
            } else {
                setError('An unexpected error occurred.');
            }
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchStatus]);

    const upgradePlan = useCallback(async (newPlanName = 'PRO') => {
        setLoading(true);
        try {
            await apiClient.upgradePlan(newPlanName);
            await fetchStatus();
            setError(null);
        } catch (err) {
            setError('Failed to upgrade plan.');
        } finally {
            setLoading(false);
        }
    }, [fetchStatus]);

    return {
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
    };
}
