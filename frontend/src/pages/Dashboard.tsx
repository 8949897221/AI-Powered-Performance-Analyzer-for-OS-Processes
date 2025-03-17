import React from 'react';
import { motion } from 'framer-motion';
import { CpuChipIcon, ServerIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSystemStats } from '../hooks/useSystemStats';
import StatCard from '../components/layout/StatCard';
import LoadingSpinner from '../components/layout/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { stats, loading, error } = useSystemStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        <p>{error || 'Failed to load system statistics'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          System Performance
        </h1>
        <p className="text-gray-600 dark:text-dark-text">
          Real-time monitoring of your system's resources
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatCard
          title="CPU Usage"
          value={`${stats.cpu.usage_percent.toFixed(1)}%`}
          icon={CpuChipIcon}
          percentage={stats.cpu.usage_percent}
          color="blue"
        />
        <StatCard
          title="Memory Usage"
          value={stats.memory.used}
          icon={ServerIcon}
          percentage={stats.memory.usage_percent}
          color="purple"
        />
        <StatCard
          title="Disk Usage"
          value={stats.disk.used}
          icon={CircleStackIcon}
          percentage={stats.disk.usage_percent}
          color="green"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-dark-bg-secondary p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Resource Usage History
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { time: '0s', cpu: stats.cpu.usage_percent, memory: stats.memory.usage_percent, disk: stats.disk.usage_percent },
                // Add more data points here
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Line type="monotone" dataKey="cpu" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="memory" stroke="#8B5CF6" strokeWidth={2} />
              <Line type="monotone" dataKey="disk" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-dark-bg-secondary p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          System Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 dark:text-dark-text">
              CPU Cores: <span className="font-semibold">{stats.cpu.cores}</span>
            </p>
            <p className="text-gray-600 dark:text-dark-text">
              CPU Frequency: <span className="font-semibold">{stats.cpu.frequency_mhz} MHz</span>
            </p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-dark-text">
              Total Memory: <span className="font-semibold">{stats.memory.total}</span>
            </p>
            <p className="text-gray-600 dark:text-dark-text">
              Total Disk: <span className="font-semibold">{stats.disk.total}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard; 