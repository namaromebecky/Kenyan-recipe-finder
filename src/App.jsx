import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import { kenyanRecipes } from './kenyanRecipes';

function App() {
  const [recipes, setRecipes] = useState(kenyanRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setRecipes(kenyanRecipes);
      return;
    }
    
    const filtered = kenyanRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.swahiliName.toLowerCase().includes(query.toLowerCase()) ||
      recipe.category.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some(ing => 
        ing.ingredient.toLowerCase().includes(query.toLowerCase())
      )
    );
    
    setRecipes(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-green-700 to-green-900 text-white shadow-xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <span className="text-2xl text-green-700">🍛</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Kenyan Recipe Finder</h1>
                <p className="text-green-200 text-sm">Discover authentic Kenyan cuisine</p>
              </div>
            </div>
            <button 
              onClick={() => window.open('https://github.com/namaromebecky/Kenyan-recipe-finder', '_blank')}
              className="bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Jikoni ya Kenya</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Experience the rich flavors of Kenya with our authentic recipes passed down through generations
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedRecipe ? (
          <RecipeDetails 
            recipe={selectedRecipe} 
            onBack={() => setSelectedRecipe(null)} 
          />
        ) : (
          <div>
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Kenyan Dishes'}
              </h3>
              <p className="text-gray-600">
                {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <RecipeList 
              recipes={recipes} 
              onSelect={setSelectedRecipe} 
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">About This Project</h4>
              <p className="text-gray-400">
                A school project showcasing authentic Kenyan cuisine. Built with React, Tailwind CSS, and love for Kenyan food culture.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Featured Cuisines</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• Kikuyu Traditional</li>
                <li>• Coastal Swahili</li>
                <li>• Luo Fish Dishes</li>
                <li>• Maasai Specialties</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Project Links</h4>
              <div className="space-y-2">
                <a href="https://github.com/namaromebecky/Kenyan-recipe-finder" 
                   className="text-amber-400 hover:text-amber-300 block">
                  GitHub Repository
                </a>
                <a href="#" className="text-amber-400 hover:text-amber-300 block">
                  View Live Demo
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Kenyan Recipe Finder | School Project | All recipe data is for educational purposes</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
