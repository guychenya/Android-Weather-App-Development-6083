import * as WiIcons from 'react-icons/wi';
import * as FiIcons from 'react-icons/fi';

const { 
  WiDaySunny, 
  WiCloudy, 
  WiRain, 
  WiSnow, 
  WiDayCloudy,
  WiNightClear,
  WiNightCloudy,
  WiThunderstorm,
  WiFog,
  WiWindy
} = WiIcons;

const { FiSun, FiCloud, FiCloudRain } = FiIcons;

export const getWeatherIcon = (condition) => {
  const normalizedCondition = condition.toLowerCase();
  
  const iconMap = {
    'sunny': WiDaySunny,
    'clear': WiDaySunny,
    'cloudy': WiCloudy,
    'overcast': WiCloudy,
    'partly-cloudy': WiDayCloudy,
    'partly cloudy': WiDayCloudy,
    'rainy': WiRain,
    'rain': WiRain,
    'showers': WiRain,
    'snowy': WiSnow,
    'snow': WiSnow,
    'thunderstorm': WiThunderstorm,
    'storm': WiThunderstorm,
    'fog': WiFog,
    'foggy': WiFog,
    'mist': WiFog,
    'windy': WiWindy,
    'night-clear': WiNightClear,
    'night-cloudy': WiNightCloudy
  };
  
  return iconMap[normalizedCondition] || WiDayCloudy;
};

export const getWeatherGradient = (condition) => {
  const normalizedCondition = condition.toLowerCase();
  
  const gradientMap = {
    'sunny': 'from-yellow-400 via-orange-500 to-red-500',
    'clear': 'from-blue-400 via-blue-500 to-blue-600',
    'cloudy': 'from-gray-400 via-gray-500 to-gray-600',
    'rainy': 'from-gray-600 via-blue-600 to-blue-800',
    'snowy': 'from-blue-200 via-blue-300 to-blue-500',
    'partly-cloudy': 'from-blue-400 via-yellow-400 to-orange-500',
    'thunderstorm': 'from-gray-800 via-purple-800 to-indigo-900'
  };
  
  return gradientMap[normalizedCondition] || 'from-blue-400 via-purple-500 to-pink-500';
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const formatTemperature = (temp, unit = 'C') => {
  return `${Math.round(temp)}°${unit}`;
};

export const getUVIndexLevel = (index) => {
  if (index <= 2) return { level: 'Low', color: 'text-green-400' };
  if (index <= 5) return { level: 'Moderate', color: 'text-yellow-400' };
  if (index <= 7) return { level: 'High', color: 'text-orange-400' };
  if (index <= 10) return { level: 'Very High', color: 'text-red-400' };
  return { level: 'Extreme', color: 'text-purple-400' };
};

export const getAirQualityLevel = (aqi) => {
  if (aqi <= 50) return { level: 'Good', color: 'text-green-400' };
  if (aqi <= 100) return { level: 'Moderate', color: 'text-yellow-400' };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive', color: 'text-orange-400' };
  if (aqi <= 200) return { level: 'Unhealthy', color: 'text-red-400' };
  if (aqi <= 300) return { level: 'Very Unhealthy', color: 'text-purple-400' };
  return { level: 'Hazardous', color: 'text-red-600' };
};