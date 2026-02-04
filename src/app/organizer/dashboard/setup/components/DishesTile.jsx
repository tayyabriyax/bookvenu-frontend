// app/setup/components/DishesTile.jsx
import { 
  FaUtensils, FaSearch, FaPlus, FaEdit, FaTrash, 
  FaCheckCircle, FaClock 
} from 'react-icons/fa';
import { GiKnifeFork, GiBowlOfRice, GiChickenOven, GiCupcake } from 'react-icons/gi';

const DishesTile = () => {
  // Dishes data
  const dishes = [
    { id: 1, name: "Butter Chicken", category: "Main Course", price: "₹450", status: "Available", popularity: "High", icon: <GiChickenOven />, color: "from-amber-500 to-orange-500" },
    { id: 2, name: "Paneer Tikka", category: "Appetizer", price: "₹380", status: "Available", popularity: "Medium", icon: <GiBowlOfRice />, color: "from-emerald-500 to-teal-500" },
    { id: 3, name: "Biryani", category: "Main Course", price: "₹550", status: "Limited", popularity: "High", icon: <GiKnifeFork />, color: "from-violet-500 to-purple-500" },
    { id: 4, name: "Gulab Jamun", category: "Dessert", price: "₹200", status: "Available", popularity: "Low", icon: <GiCupcake />, color: "from-rose-500 to-pink-500" },
    { id: 5, name: "Tandoori Roti", category: "Bread", price: "₹50", status: "Available", popularity: "High", icon: <FaUtensils />, color: "from-blue-500 to-cyan-500" },
    { id: 6, name: "Masala Dosa", category: "South Indian", price: "₹280", status: "Available", popularity: "Medium", icon: <GiBowlOfRice />, color: "from-amber-500 to-orange-500" }
  ];

  // Categories for filtering
  const categories = ["All", "Main Course", "Appetizer", "Dessert", "Bread", "South Indian"];

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <FaUtensils className="text-violet-600" />
            <span>Dishes Menu</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-1">Manage your food items and pricing</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              className="pl-10 pr-4 py-2.5 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 text-sm w-full"
            />
          </div>
          <button className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200 text-sm">
            <FaPlus /> <span>Add Dish</span>
          </button>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
        {categories.map((category, index) => (
          <button 
            key={index}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg ${category === 'All' ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} text-sm md:text-base`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Dishes Grid */}
      <div className="space-y-3 md:space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {dishes.map((dish) => (
          <div key={dish.id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-100 hover:border-violet-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${dish.color} rounded-lg md:rounded-xl flex items-center justify-center`}>
                  <div className="text-white text-lg md:text-xl">{dish.icon}</div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-800 text-base md:text-lg truncate">{dish.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs md:text-sm">
                      {dish.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs md:text-sm font-semibold ${
                      dish.popularity === 'High' ? 'bg-emerald-100 text-emerald-700' :
                      dish.popularity === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {dish.popularity}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-4">
                <div className="text-right">
                  <p className="font-bold text-gray-800 text-base md:text-lg">{dish.price}</p>
                  <span className={`inline-flex items-center space-x-1 text-xs md:text-sm ${
                    dish.status === 'Available' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    {dish.status === 'Available' ? <FaCheckCircle /> : <FaClock />}
                    <span>{dish.status}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-1 md:space-x-2">
                  <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaEdit className="text-violet-600 text-sm md:text-base" />
                  </button>
                  <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FaTrash className="text-rose-600 text-sm md:text-base" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-3 md:p-4">
            <p className="text-sm text-gray-600">Total Dishes</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800">6</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 md:p-4">
            <p className="text-sm text-gray-600">Available</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800">5</p>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-3 md:p-4">
            <p className="text-sm text-gray-600">Average Price</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800">₹318</p>
          </div>
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-3 md:p-4">
            <p className="text-sm text-gray-600">High Popularity</p>
            <p className="text-xl md:text-2xl font-bold text-gray-800">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishesTile;