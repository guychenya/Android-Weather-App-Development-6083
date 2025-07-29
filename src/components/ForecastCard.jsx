import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { getWeatherIcon } from '../utils/weatherUtils';

const ForecastCard = ({ forecast }) => {
  if (!forecast) return null;

  const weatherIcon = getWeatherIcon(forecast.condition);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass rounded-2xl p-6 text-white text-center h-full"
    >
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-1">{forecast.day}</h3>
        <p className="text-sm opacity-70">{forecast.date}</p>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="mb-4"
      >
        <SafeIcon 
          icon={weatherIcon} 
          className="text-5xl mx-auto weather-icon opacity-90" 
        />
      </motion.div>

      <div className="mb-4">
        <div className="text-2xl font-bold mb-1">
          {forecast.high}°
        </div>
        <div className="text-lg opacity-70">
          {forecast.low}°
        </div>
      </div>

      <div className="text-sm opacity-80 capitalize">
        {forecast.condition}
      </div>

      {forecast.precipitation && (
        <div className="mt-3 text-xs opacity-70">
          {forecast.precipitation}% chance of rain
        </div>
      )}
    </motion.div>
  );
};

export default ForecastCard;