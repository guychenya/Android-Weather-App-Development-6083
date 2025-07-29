import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiMapPin } = FiIcons;

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions] = useState([
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Mumbai', 'Singapore'
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    onSearch(city);
    setQuery('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative max-w-md mx-auto">
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="relative"
      >
        <div className="glass rounded-2xl p-4 flex items-center space-x-3">
          <SafeIcon icon={FiSearch} className="text-white/70 text-xl" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowSuggestions(query.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search for a city..."
            className="flex-1 bg-transparent text-white placeholder-white/70 outline-none text-lg"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-white/20 hover:bg-white/30 rounded-xl p-2 transition-colors"
          >
            <SafeIcon icon={FiSearch} className="text-white text-lg" />
          </motion.button>
        </div>
      </motion.form>

      {showSuggestions && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl p-2 z-50"
        >
          {suggestions
            .filter(city => city.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 6)
            .map((city, index) => (
              <motion.button
                key={city}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(city)}
                className="w-full flex items-center space-x-3 p-3 text-white hover:bg-white/10 rounded-xl transition-colors text-left"
              >
                <SafeIcon icon={FiMapPin} className="text-white/70" />
                <span>{city}</span>
              </motion.button>
            ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;