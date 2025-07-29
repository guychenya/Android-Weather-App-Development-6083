import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as WiIcons from 'react-icons/wi';
import * as FiIcons from 'react-icons/fi';
import { getWeatherIcon } from '../utils/weatherUtils';

const { FiMapPin, FiCalendar } = FiIcons;

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const weatherIcon = getWeatherIcon(weather.condition);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass rounded-3xl p-8 text-white h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiMapPin} className="text-xl opacity-80" />
          <h1 className="text-2xl font-bold">{weather.city}</h1>
        </div>
        <div className="flex items-center space-x-2 text-sm opacity-80">
          <SafeIcon icon={FiCalendar} />
          <span>{weather.date}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="text-7xl font-light mb-2"
          >
            {weather.temperature}°
          </motion.div>
          <div className="text-xl opacity-90 capitalize mb-2">
            {weather.condition}
          </div>
          <div className="text-sm opacity-70">
            Feels like {weather.feelsLike}°
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="weather-icon"
        >
          <SafeIcon 
            icon={weatherIcon} 
            className="text-8xl opacity-90" 
          />
        </motion.div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/20">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="opacity-70">High</span>
            <span className="font-semibold">{weather.high}°</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-70">Low</span>
            <span className="font-semibold">{weather.low}°</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;