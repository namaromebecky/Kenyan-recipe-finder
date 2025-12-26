import React from 'react';

const RecipeDetails = ({ recipe, onBack }) => {
  const difficultyColor = {
    'Easy': 'bg-green-100 text-green-800',
    'Medium': 'bg-amber-100 text-amber-800',
    'Hard': 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 text-green-700 hover:text-green-900 font-semibold flex items-center group"
      >
        <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to All Recipes
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Hero Section */}
        <div className="relative">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-bold">
                {recipe.category}
              </span>
              <span className={`px-4 py-2 rounded-full font-bold ${difficultyColor[recipe.difficulty]}`}>
                {recipe.difficulty}
              </span>
              <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-bold">
                🇰🇪 {recipe.cuisine} Cuisine
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {recipe.name}
            </h1>
            <p className="text-white/90 text-xl">{recipe.swahiliName}</p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-700 text-lg">{recipe.description}</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-700">{recipe.prepTime}</div>
              <div className="text-sm text-gray-600">Prep Time</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-amber-700">{recipe.cookTime}</div>
              <div className="text-sm text-gray-600">Cook Time</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-700">{recipe.serves}</div>
              <div className="text-sm text-gray-600">Serves</div>
            </div>
            <div className="bg-red-50 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-red-700">{recipe.difficulty}</div>
              <div className="text-sm text-gray-600">Difficulty</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                <span className="flex items-center">
                  <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Ingredients
                </span>
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((item, index) => (
                  <li key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-700 font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{item.ingredient}</div>
                    </div>
                    <div className="text-green-700 font-semibold">
                      {item.quantity} {item.unit}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                <span className="flex items-center">
                  <svg className="w-6 h-6 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Cooking Instructions
                </span>
              </h2>
              <div className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-l-4 border-orange-500">
                    <div className="flex items-start">
                      <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chef's Tips */}
              {recipe.tips && (
                <div className="mt-8 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <h3 className="font-bold text-green-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Chef's Tip
                  </h3>
                  <p className="text-green-700">{recipe.tips}</p>
                </div>
              )}
            </div>
          </div>

          {/* Cultural Note */}
          <div className="mt-10 p-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl border border-amber-200">
            <div className="flex items-start">
              <div className="bg-amber-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">🇰🇪</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">Cultural Significance</h4>
                <p className="text-gray-700">
                  {recipe.name} is more than just food in Kenya - it's part of social gatherings, celebrations, 
                  and daily life. This dish represents the rich culinary heritage of Kenya's diverse communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
