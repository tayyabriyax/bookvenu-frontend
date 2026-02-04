// app/setup/components/ReviewsTile.jsx
import { FaStar, FaSearch, FaReply, FaTrash, FaUser } from 'react-icons/fa';

const ReviewsTile = () => {
  const reviews = [
    { id: 1, customer: "Priya Sharma", rating: 5, comment: "Excellent venue and service!", date: "Dec 15, 2023", venue: "Grand Palace", status: "Published", color: "from-emerald-500 to-teal-500" },
    { id: 2, customer: "Raj Patel", rating: 4, comment: "Good food but service was slow", date: "Dec 20, 2023", venue: "Royal Banquet", status: "Published", color: "from-amber-500 to-orange-500" },
    { id: 3, customer: "Anjali Singh", rating: 5, comment: "Perfect wedding venue!", date: "Dec 25, 2023", venue: "Sky Garden", status: "Pending", color: "from-violet-500 to-purple-500" },
    { id: 4, customer: "Vikram Mehta", rating: 3, comment: "Average experience", date: "Dec 28, 2023", venue: "Lakeview Resorts", status: "Published", color: "from-rose-500 to-pink-500" }
  ];

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <FaStar className="text-amber-500" />
            <span>Customer Reviews</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-1">Manage and respond to reviews</p>
        </div>
        
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search reviews..." 
            className="pl-10 pr-4 py-2.5 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 text-sm"
          />
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-10 h-10 bg-gradient-to-r ${review.color} rounded-full flex items-center justify-center`}>
                    <FaUser className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{review.customer}</h3>
                    <p className="text-gray-600 text-sm">{review.venue} • {review.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < review.rating ? "text-amber-400" : "text-gray-300"} />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-gray-700">{review.rating}.0</span>
                </div>
                
                <p className="text-gray-700 mb-3">{review.comment}</p>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    review.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {review.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FaReply className="text-blue-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FaTrash className="text-rose-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTile;