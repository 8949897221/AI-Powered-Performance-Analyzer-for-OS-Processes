import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import {
  HomeIcon,
  ChartBarIcon,
  LightBulbIcon,
  BellIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { path: '/', name: 'Home', icon: HomeIcon },
  { path: '/dashboard', name: 'Dashboard', icon: ChartBarIcon },
  { path: '/predictions', name: 'Predictions', icon: LightBulbIcon },
  { path: '/alerts', name: 'Alerts', icon: BellIcon },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-dark-bg-secondary border-r border-gray-200 dark:border-dark-border p-4 flex flex-col"
    >
      <div className="flex items-center justify-center mb-8">
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
        >
          Performance AI
        </motion.h1>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.li key={item.path} whileHover={{ scale: 1.02 }}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-bg-primary'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute left-0 w-1 h-8 bg-primary-500 rounded-r-full"
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      <button
        onClick={toggleTheme}
        className="flex items-center px-4 py-2 mt-4 w-full rounded-lg text-gray-600 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-bg-primary transition-colors"
      >
        {theme === 'dark' ? (
          <SunIcon className="w-5 h-5 mr-3" />
        ) : (
          <MoonIcon className="w-5 h-5 mr-3" />
        )}
        <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    </motion.div>
  );
};

export default Sidebar; 