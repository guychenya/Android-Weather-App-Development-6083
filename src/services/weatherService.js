// Mock weather service - replace with actual API calls
const generateMockWeatherData = (city) => {
  const conditions = ['sunny', 'cloudy', 'rainy', 'snowy', 'partly-cloudy'];
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const baseTemp = Math.floor(Math.random() * 30) + 5; // 5-35°C
  
  return {
    city: city,
    temperature: baseTemp,
    condition: randomCondition,
    feelsLike: baseTemp + Math.floor(Math.random() * 6) - 3,
    high: baseTemp + Math.floor(Math.random() * 8) + 2,
    low: baseTemp - Math.floor(Math.random() * 8) - 2,
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
    windDirection: 'NW',
    visibility: Math.floor(Math.random() * 5) + 8, // 8-13 km
    pressure: Math.floor(Math.random() * 50) + 1000, // 1000-1050 hPa
    uvIndex: Math.floor(Math.random() * 11), // 0-10
    sunrise: '6:30 AM',
    sunset: '7:45 PM',
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };
};

const generateMockForecast = () => {
  const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday'];
  const conditions = ['sunny', 'cloudy', 'rainy', 'partly-cloudy', 'snowy'];
  
  return days.map((day, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    
    const baseTemp = Math.floor(Math.random() * 25) + 10;
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return {
      day,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      high: baseTemp + Math.floor(Math.random() * 5),
      low: baseTemp - Math.floor(Math.random() * 8),
      condition,
      precipitation: condition === 'rainy' ? Math.floor(Math.random() * 80) + 20 : Math.floor(Math.random() * 30)
    };
  });
};

export const getWeatherData = async (city) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, you would make an API call here
  // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
  // const data = await response.json();
  
  if (Math.random() > 0.9) { // 10% chance of error for demo
    throw new Error('City not found. Please check the spelling and try again.');
  }
  
  return generateMockWeatherData(city);
};

export const getForecastData = async (city) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, you would make an API call here
  // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=YOUR_API_KEY&units=metric`);
  // const data = await response.json();
  
  return generateMockForecast();
};

// Real API integration example (commented out):
/*
const API_KEY = 'your_openweathermap_api_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherData = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    
    const data = await response.json();
    
    return {
      city: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main.toLowerCase(),
      feelsLike: Math.round(data.main.feels_like),
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      windDirection: getWindDirection(data.wind.deg),
      visibility: Math.round(data.visibility / 1000),
      pressure: data.main.pressure,
      uvIndex: 5, // Would need separate UV API call
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      }),
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
  } catch (error) {
    throw new Error('Failed to fetch weather data. Please try again.');
  }
};
*/