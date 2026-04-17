// Centralized API client using Fetch API
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/api';

export const apiClient = {
    generateText: async (prompt, userId = 'default_user') => {
        const response = await fetch(`${API_BASE_URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, prompt }),
        });

        if (!response.ok) {
            if (response.status === 429) {
                // Rate Limit Exceeded
                const retryAfter = response.headers.get('Retry-After');
                throw { status: 429, retryAfter: parseInt(retryAfter, 10) || 60, message: await response.text() };
            }
            if (response.status === 402) {
                // Quota Exhausted
                throw { status: 402, message: await response.text() };
            }
            throw new Error('Network response was not ok');
        }
        
        return response.json();
    },

    upgradePlan: async (planName = 'PRO', userId = 'default_user') => {
        const response = await fetch(`${API_BASE_URL}/quota/upgrade?userId=${userId}&planName=${planName}`, {
            method: 'POST',
        });
        
        if (!response.ok) {
            throw new Error('Failed to upgrade plan');
        }
        
        return response.text();
    },

    getUsageHistory: async (userId = 'default_user') => {
        const response = await fetch(`${API_BASE_URL}/quota/history?userId=${userId}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch history');
        }
        
        return response.json();
    },

    getStatus: async (userId = 'default_user') => {
        const response = await fetch(`${API_BASE_URL}/quota/status?userId=${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch status');
        }
        return response.json();
    }
};
