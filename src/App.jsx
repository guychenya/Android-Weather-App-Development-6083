import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import ForecastCard from './components/ForecastCard';
import WeatherDetails from './components/WeatherDetails';
import LoadingSpinner from './components/LoadingSpinner';
import { getWeatherData, getForecastData } from './services/weatherService';
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      
      const [weatherData, forecastData] = await Promise.all([
        getWeatherData(cityName),
        getForecastData(cityName)
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setCity(cityName);
    } catch (err) {
      setError(err.message);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSearch = (searchCity) => {
    fetchWeatherData(searchCity);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white p-8 rounded-2xl bg-white/10 backdrop-blur-md"
        >
          <h2 className="text-2xl font-bold mb-4">Weather data unavailable</h2>
          <p className="text-lg mb-6">{error}</p>
          <button
            onClick={() => fetchWeatherData(city)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <WeatherCard weather={currentWeather} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <WeatherDetails weather={currentWeather} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">5-Day Forecast</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <AnimatePresence>
              {forecast.map((day, index) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <ForecastCard forecast={day} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;