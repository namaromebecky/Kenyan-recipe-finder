import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [kenyanKeywords] = useState([
    'Nyama Choma', 'Ugali', 'Chapati', 'Sukuma Wiki', 
    'Mandazi', 'Pilau', 'Githeri', 'Mutura', 'Viazi Karai'
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleSuggestionClick = (keyword) => {
    setQuery(keyword);
    onSearch(keyword);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Kenyan dishes (e.g., Ugali, Nyama Choma)..."
              className="w-full p-4 pl-12 pr-12 rounded-xl shadow-lg focus:outline-none focus:ring-3 focus:ring-amber-500 text-gray-800"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow font-semibold flex items-center"
          >
            Search
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {/* Kenyan Cuisine Keywords */}
      <div className="mt-6">
        <p className="text-white mb-3 text-center font-medium">Try authentic Kenyan dishes:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {kenyanKeywords.map((keyword, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(keyword)}
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-white/30"
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>

      {/* Cultural Note */}
      <div className="mt-8 text-center">
        <p className="text-white/80 text-sm">
          <span className="font-bold">Did you know?</span> "Jikoni" means kitchen in Swahili, Kenya's national language
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
