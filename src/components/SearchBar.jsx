import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-xl shadow-lg mb-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
          🇰🇪 Kenyan Recipe Finder
        </h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for recipes (e.g., Ugali, Chapati, Nyama Choma)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Category Filter */}
          <div className="md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Clear Button */}
          {(searchTerm || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="bg-secondary hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 whitespace-nowrap"
            >
              Clear Filters
            </button>
          )}
        </div>
        
        <p className="text-white/90 text-center mt-4">
          Discover authentic Kenyan recipes from traditional dishes to modern favorites
        </p>
      </div>
    </div>
  );
};

export default SearchBar;
