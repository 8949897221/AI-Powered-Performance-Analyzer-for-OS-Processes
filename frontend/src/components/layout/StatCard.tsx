import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  percentage?: number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  percentage,
  color = 'primary',
}) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className="p-6 bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-dark-text mb-1">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/20 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-500`} />
        </div>
      </div>

      {percentage !== undefined && (
        <div className="mt-4">
          <div className="relative h-2 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5 }}
              className={`absolute top-0 left-0 h-full bg-${color}-500`}
            />
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-dark-text">
            {percentage}% utilized
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard; 