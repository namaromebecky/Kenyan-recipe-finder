import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onSelect }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-white to-amber-50 rounded-2xl shadow-lg border border-amber-100">
        <div className="text-8xl mb-6">🍳</div>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Hakuna Mapishi Yaliyopatikana
        </h3>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          No recipes found. Try searching for authentic Kenyan dishes!
        </p>
        <div className="inline-flex items-center justify-center p-4 bg-amber-100 rounded-lg">
          <svg className="w-6 h-6 text-amber-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-amber-800 font-medium">
            Search suggestions: Ugali, Nyama Choma, Chapati, Sukuma Wiki
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            onClick={() => onSelect(recipe)} 
          />
        ))}
      </div>
      
      {/* Cultural Information */}
      <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-amber-50 rounded-2xl border border-green-100">
        <div className="flex items-start">
          <div className="bg-green-100 p-3 rounded-lg mr-4">
            <span className="text-2xl">🇰🇪</span>
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">About Kenyan Cuisine</h4>
            <p className="text-gray-600">
              Kenyan food is diverse, with influences from over 40 ethnic groups. Staple foods include ugali (maize meal), 
              sukuma wiki (collard greens), and nyama choma (grilled meat). Coastal regions feature Swahili dishes with 
              coconut and spices, while western Kenya is known for fish from Lake Victoria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeList;
