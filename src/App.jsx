import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';
import RecipeDetails from './components/RecipeDetails';
import { kenyanRecipes, categories } from './data/kenyanRecipes.js';
import { FaUtensils, FaInfoCircle, FaFilter, FaRandom, FaFire, FaLeaf, FaCookie, FaCoffee } from 'react-icons/fa';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState(kenyanRecipes);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  useEffect(() => {
    setLoading(true);
    
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      let filtered = kenyanRecipes;

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(recipe =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some(ing => 
            ing.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          recipe.tags.some(tag => 
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }

      // Filter by category
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(recipe => recipe.category === selectedCategory);
      }

      // Filter by difficulty
      if (difficultyFilter !== 'All') {
        filtered = filtered.filter(recipe => recipe.difficulty === difficultyFilter);
      }

      setFilteredRecipes(filtered);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, difficultyFilter]);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  const getRandomRecipe = () => {
    const randomIndex = Math.floor(Math.random() * kenyanRecipes.length);
    setSelectedRecipe(kenyanRecipes[randomIndex]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setDifficultyFilter('All');
  };

  // Statistics
  const stats = {
    totalRecipes: kenyanRecipes.length,
    vegetarianCount: kenyanRecipes.filter(r => r.tags.includes('Vegetarian')).length,
    streetFoodCount: kenyanRecipes.filter(r => r.category === 'Street Foods').length,
    averageRating: (kenyanRecipes.reduce((acc, r) => acc + r.rating, 0) / kenyanRecipes.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Navigation */}
      <nav className="bg-gradient-to-r from-primary to-orange-600 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-xl">
                <FaUtensils className="text-primary text-2xl" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">KenyanRecipes</span>
                <p className="text-white/80 text-sm">Authentic Flavors of Kenya</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={getRandomRecipe}
                className="hidden md:flex items-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-300"
              >
                <FaRandom className="mr-2" />
                Random Recipe
              </button>
              <div className="text-white text-right">
                <p className="text-sm opacity-80">Discovering</p>
                <p className="text-xl font-bold">{stats.totalRecipes} Authentic Recipes</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedRecipe ? (
          <RecipeDetails recipe={selectedRecipe} onBack={handleBack} />
        ) : (
          <>
            {/* Enhanced Search Section */}
            <div className="mb-10">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
              />

              {/* Advanced Filters Toggle */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  <FaFilter className="mr-2" />
                  {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                </button>
                
                {(searchTerm || selectedCategory !== 'All' || difficultyFilter !== 'All') && (
                  <button
                    onClick={clearAllFilters}
                    className="text-primary hover:text-orange-700 font-semibold"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Filters</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                      <select
                        value={difficultyFilter}
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="All">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cooking Time</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Any Time</option>
                        <option>Under 30 min</option>
                        <option>30-60 min</option>
                        <option>Over 60 min</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Any Rating</option>
                        <option>4+ Stars</option>
                        <option>4.5+ Stars</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Dietary</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Any</option>
                        <option>Vegetarian</option>
                        <option>High Protein</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center">
                <div className="bg-primary/10 p-3 rounded-xl mr-4">
                  <FaFire className="text-primary text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRecipes}</p>
                  <p className="text-gray-600 text-sm">Total Recipes</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center">
                <div className="bg-green-100 p-3 rounded-xl mr-4">
                  <FaLeaf className="text-green-600 text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.vegetarianCount}</p>
                  <p className="text-gray-600 text-sm">Vegetarian</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center">
                <div className="bg-yellow-100 p-3 rounded-xl mr-4">
                  <FaCookie className="text-yellow-600 text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.streetFoodCount}</p>
                  <p className="text-gray-600 text-sm">Street Foods</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <FaCoffee className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                  <p className="text-gray-600 text-sm">Avg Rating</p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mb-4"></div>
                <p className="text-gray-600 text-lg">Finding delicious recipes...</p>
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <FaInfoCircle className="text-gray-400 text-5xl mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No recipes found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-primary hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Discover Kenyan Recipes
                    </h2>
                    <p className="text-gray-600">
                      Showing {filteredRecipes.length} of {kenyanRecipes.length} recipes
                    </p>
                  </div>
                  <button
                    onClick={getRandomRecipe}
                    className="flex items-center bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    <FaRandom className="mr-2" />
                    Random Recipe
                  </button>
                </div>

                {/* Quick Category Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-primary to-orange-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-gray-50 shadow hover:shadow-md'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Recipe Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onSelect={handleRecipeSelect}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FaUtensils className="text-primary text-3xl mr-3" />
                <span className="text-2xl font-bold">Kenyan Recipe Finder</span>
              </div>
              <p className="text-gray-400">
                Celebrating Kenya's rich culinary heritage with authentic, 
                time-honored recipes passed down through generations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Kenyan Cuisine</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cooking Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Regional Specialties</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Traditional Techniques</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <p className="text-gray-400 mb-4">
                Share your Kenyan recipes with us!
              </p>
              <button className="bg-primary hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
                Submit Your Recipe
              </button>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Kenyan Recipe Finder. All recipes are for educational and cultural preservation purposes.</p>
            <p className="mt-2">Traditional Kenyan dishes curated with ❤️ for food lovers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
