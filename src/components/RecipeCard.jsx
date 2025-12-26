import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
  const difficultyColor = {
    'Easy': 'bg-green-100 text-green-800',
    'Medium': 'bg-amber-100 text-amber-800',
    'Hard': 'bg-red-100 text-red-800'
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
    >
      {/* Recipe Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Swahili Name Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-gray-800">{recipe.swahiliName}</span>
        </div>
        
        {/* Difficulty Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold ${difficultyColor[recipe.difficulty]}`}>
          {recipe.difficulty}
        </div>
      </div>
      
      {/* Recipe Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-bold text-xl text-gray-800 group-hover:text-green-700 transition-colors">
              {recipe.name}
            </h3>
            <p className="text-gray-500 text-sm mt-1">{recipe.swahiliName}</p>
          </div>
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
            {recipe.category}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>
        
        {/* Recipe Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{recipe.prepTime} prep</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Serves {recipe.serves}</span>
          </div>
        </div>
        
        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center group-hover:shadow-md">
          View Full Recipe
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
