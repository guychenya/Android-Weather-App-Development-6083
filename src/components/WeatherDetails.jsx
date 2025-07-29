import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiWind, FiDroplet, FiEye, FiThermometer, FiSun, FiMoon } = FiIcons;

const WeatherDetails = ({ weather }) => {
  if (!weather) return null;

  const details = [
    {
      icon: FiWind,
      label: 'Wind Speed',
      value: `${weather.windSpeed} km/h`,
      description: weather.windDirection
    },
    {
      icon: FiDroplet,
      label: 'Humidity',
      value: `${weather.humidity}%`,
      description: 'Relative humidity'
    },
    {
      icon: FiEye,
      label: 'Visibility',
      value: `${weather.visibility} km`,
      description: 'Clear visibility'
    },
    {
      icon: FiThermometer,
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
      description: 'Atmospheric pressure'
    },
    {
      icon: FiSun,
      label: 'UV Index',
      value: weather.uvIndex,
      description: weather.uvIndex > 6 ? 'High exposure' : 'Low exposure'
    },
    {
      icon: FiSun,
      label: 'Sunrise',
      value: weather.sunrise,
      description: 'Morning'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass rounded-3xl p-6 text-white h-full"
    >
      <h2 className="text-xl font-bold mb-6">Weather Details</h2>
      
      <div className="space-y-4">
        {details.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-white/10">
                <SafeIcon icon={detail.icon} className="text-lg" />
              </div>
              <div>
                <div className="font-medium">{detail.label}</div>
                <div className="text-xs opacity-70">{detail.description}</div>
              </div>
            </div>
            <div className="font-bold text-lg">{detail.value}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-4 rounded-xl bg-gradient-to-r from-orange-400/20 to-pink-400/20 border border-white/10"
      >
        <div className="flex items-center justify-between mb-2">
          <SafeIcon icon={FiSun} className="text-2xl text-orange-300" />
          <SafeIcon icon={FiMoon} className="text-2xl text-blue-300" />
        </div>
        <div className="flex justify-between text-sm">
          <div>
            <div className="opacity-70">Sunrise</div>
            <div className="font-semibold">{weather.sunrise}</div>
          </div>
          <div className="text-right">
            <div className="opacity-70">Sunset</div>
            <div className="font-semibold">{weather.sunset}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherDetails;