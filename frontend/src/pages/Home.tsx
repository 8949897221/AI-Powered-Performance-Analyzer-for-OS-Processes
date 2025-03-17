import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChartBarIcon, CpuChipIcon, ServerIcon } from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: CpuChipIcon,
      title: 'Real-time Monitoring',
      description: 'Track CPU, Memory, and Disk usage in real-time with beautiful visualizations.',
    },
    {
      icon: ServerIcon,
      title: 'AI-Powered Predictions',
      description: 'Get intelligent forecasts about future system performance and resource usage.',
    },
    {
      icon: ChartBarIcon,
      title: 'Smart Alerts',
      description: 'Receive instant notifications and optimization suggestions when issues arise.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
        >
          AI-Powered Performance Analyzer
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-dark-text mb-8"
        >
          Monitor, predict, and optimize your system's performance with the power of AI
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
          className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg shadow-lg transition-colors"
        >
          Get Started
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.2 }}
              className="p-6 bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg p-2 mb-4">
                <Icon className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-dark-text">{feature.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Home; 