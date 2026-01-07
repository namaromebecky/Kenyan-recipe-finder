import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onSelect, searchQuery }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-block p-6 bg-stone-100 rounded-2xl mb-8">
          <svg className="w-16 h-16 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-light text-stone-700 mb-4">
          No recipes found
        </h3>
        
        <p className="text-stone-500 max-w-md mx-auto mb-8">
          {searchQuery 
            ? `No recipes match "${searchQuery}". Try searching for traditional Kenyan dishes.`
            : 'No recipes in this category. Try another category.'
          }
        </p>
        
        <div className="bg-stone-50 rounded-xl p-6 max-w-md mx-auto">
          <p className="text-stone-600 text-sm">
            <span className="font-medium text-amber-600">Tip:</span> Search for dishes like Ugali, Nyama Choma, Chapati, or Pilau
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            onClick={() => onSelect(recipe)} 
          />
        ))}
      </div>
      
      {/* Collection Info */}
      <div className="mt-16 pt-8 border-t border-stone-200">
        <div className="max-w-2xl mx-auto text-center">
          <h4 className="text-xl font-light text-stone-700 mb-4">
            About This Collection
          </h4>
          <p className="text-stone-600 leading-relaxed">
            This curated collection features authentic Kenyan recipes passed down through generations. 
            Each recipe includes cultural context, traditional preparation methods, and nutritional information 
            to provide a complete culinary experience.
          </p>
          <div className="flex justify-center items-center space-x-4 mt-6 text-stone-500 text-sm">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
              Beginner to Intermediate
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
              Traditional Methods
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-rose-400 rounded-full mr-2"></div>
              Cultural Stories
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeList;
