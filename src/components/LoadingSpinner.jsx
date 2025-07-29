import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as WiIcons from 'react-icons/wi';

// Using a common weather icon for the spinner
const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center p-8"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-4"
      >
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full"></div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-white text-center"
      >
        <h2 className="text-xl font-semibold mb-2">Loading Weather Data</h2>
        <p className="opacity-70">Getting the latest weather information...</p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;