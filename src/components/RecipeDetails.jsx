import React, { useState } from 'react';
import { 
  FaClock, 
  FaUserFriends, 
  FaFire, 
  FaUtensilSpoon, 
  FaList, 
  FaYoutube,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaStar,
  FaShareAlt,
  FaPrint,
  FaBookmark,
  FaHeart,
  FaLeaf,
  FaPepperHot
} from 'react-icons/fa';

const RecipeDetails = ({ recipe, onBack }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!recipe) return null;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i <= Math.floor(rating) ? "text-yellow-500" : "text-gray-300"} 
        />
      );
    }
    return stars;
  };

  const shareRecipe = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: `Check out this delicious ${recipe.name} recipe!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Recipe link copied to clipboard!');
    }
  };

  const printRecipe = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Recipe Hero Section */}
      <div className="relative h-96">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
        >
          <FaArrowLeft />
        </button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 ${
              bookmarked ? 'bg-yellow-500 text-white' : 'bg-white/90 text-gray-800'
            }`}
          >
            <FaBookmark />
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className={`p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 ${
              liked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-800'
            }`}
          >
            <FaHeart />
          </button>
          <button
            onClick={shareRecipe}
            className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
          >
            <FaShareAlt />
          </button>
          <button
            onClick={printRecipe}
            className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
          >
            <FaPrint />
          </button>
        </div>

        {/* Recipe Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-primary text-white px-4 py-2 rounded-full font-bold">
              {recipe.category}
            </span>
            <span className="bg-secondary text-white px-4 py-2 rounded-full font-bold">
              {recipe.cuisine} Cuisine
            </span>
            <span className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold">
              {recipe.region}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{recipe.name}</h1>
          <p className="text-xl text-white/90 max-w-3xl">{recipe.description}</p>
        </div>
      </div>

      <div className="p-6 md:p-10">
        {/* Stats & Rating Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg">
          <div className="text-center">
            <FaClock className="text-primary text-3xl mx-auto mb-3" />
            <p className="font-bold text-gray-800">Prep Time</p>
            <p className="text-gray-600">{recipe.prepTime}</p>
          </div>
          <div className="text-center">
            <FaFire className="text-red-600 text-3xl mx-auto mb-3" />
            <p className="font-bold text-gray-800">Cook Time</p>
            <p className="text-gray-600">{recipe.cookTime}</p>
          </div>
          <div className="text-center">
            <FaUserFriends className="text-secondary text-3xl mx-auto mb-3" />
            <p className="font-bold text-gray-800">Servings</p>
            <p className="text-gray-600">{recipe.servings} people</p>
          </div>
          <div className="text-center">
            <FaLeaf className="text-green-600 text-3xl mx-auto mb-3" />
            <p className="font-bold text-gray-800">Difficulty</p>
            <p className="text-gray-600">{recipe.difficulty}</p>
          </div>
          <div className="text-center col-span-2 md:col-span-1">
            <div className="flex justify-center mb-2">
              {renderStars(recipe.rating)}
            </div>
            <p className="font-bold text-gray-800">Rating</p>
            <p className="text-gray-600">{recipe.rating}/5 ({recipe.reviews} reviews)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Ingredients */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-2xl shadow-lg mb-6">
                <div className="flex items-center mb-4">
                  <FaList className="text-primary text-2xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Ingredients</h2>
                  <span className="ml-auto bg-primary text-white px-3 py-1 rounded-full text-sm">
                    {recipe.ingredients.length} items
                  </span>
                </div>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <FaUtensilSpoon className="text-primary mr-3 flex-shrink-0" />
                      <span className="font-medium text-gray-800">{ingredient.name}</span>
                      <span className="ml-auto font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {ingredient.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutritional Info */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaLeaf className="mr-2 text-green-600" />
                  Nutritional Info
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Calories</span>
                    <span className="font-bold text-gray-900">{recipe.calories}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Protein</span>
                    <span className="font-bold text-gray-900">High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Spice Level</span>
                    <div className="flex">
                      <FaPepperHot className="text-red-500" />
                      <FaPepperHot className="text-red-500 mx-1" />
                      <FaPepperHot className="text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Instructions & More */}
          <div className="lg:col-span-2">
            {/* Instructions */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary pb-3">
                Cooking Instructions
              </h2>
              <div className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <div key={index} className="flex items-start p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <span className="bg-gradient-to-br from-primary to-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-lg font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 text-lg leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chef's Tips */}
            {recipe.tips && (
              <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaStar className="mr-2 text-yellow-500" />
                  Chef's Tips
                </h3>
                <ul className="space-y-3">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary font-bold mr-3">✓</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Recipe Tags</h3>
              <div className="flex flex-wrap gap-3">
                {recipe.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-5 py-2.5 bg-gradient-to-r from-primary/20 to-secondary/20 text-gray-800 rounded-full text-sm font-semibold hover:from-primary/30 hover:to-secondary/30 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recipe.youtubeVideo && (
                <a
                  href={recipe.youtubeVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center text-lg group"
                >
                  <FaYoutube className="mr-3 text-2xl group-hover:scale-110 transition-transform" />
                  Watch Video Tutorial
                </a>
              )}
              {recipe.source && (
                <a
                  href={recipe.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center text-lg group"
                >
                  <FaExternalLinkAlt className="mr-3 group-hover:rotate-12 transition-transform" />
                  Full Recipe Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
