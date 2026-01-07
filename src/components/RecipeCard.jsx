import React from 'react';
import { FaClock, FaUserFriends, FaFire, FaUtensils, FaStar, FaRegStar } from 'react-icons/fa';

const RecipeCard = ({ recipe, onSelect }) => {
  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaRegStar key="half" className="text-yellow-500" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer h-full transform hover:-translate-y-2"
      onClick={() => onSelect(recipe)}
    >
      <div className="relative overflow-hidden h-56">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
          {recipe.category}
        </div>
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
          {recipe.region}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">{recipe.name}</h3>
          <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
            {recipe.calories}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {renderStars(recipe.rating)}
          </div>
          <span className="text-sm text-gray-600">({recipe.reviews})</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg">
            <FaClock className="mr-2 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Prep Time</p>
              <p className="font-semibold">{recipe.prepTime}</p>
            </div>
          </div>
          <div className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg">
            <FaUserFriends className="mr-2 text-secondary flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Servings</p>
              <p className="font-semibold">{recipe.servings}</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <button className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center group">
          <FaUtensils className="mr-2 group-hover:rotate-12 transition-transform" />
          View Full Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
