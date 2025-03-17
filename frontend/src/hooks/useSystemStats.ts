import { useState, useEffect } from 'react';
import axios from 'axios';

interface SystemStats {
  cpu: {
    usage_percent: number;
    frequency_mhz: number;
    cores: number;
  };
  memory: {
    total: string;
    available: string;
    used: string;
    usage_percent: number;
  };
  disk: {
    total: string;
    used: string;
    free: string;
    usage_percent: number;
  };
}

const API_URL = 'http://localhost:8000/api';

export const useSystemStats = () => {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get<SystemStats>(`${API_URL}/stats`);
        setStats(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch system statistics');
        console.error('Error fetching system stats:', err);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchStats();

    // Set up polling every 2 seconds
    const interval = setInterval(fetchStats, 2000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  return { stats, loading, error };
}; 