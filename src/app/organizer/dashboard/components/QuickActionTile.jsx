const QuickActionTile = ({ title, icon, description, color, onClick }) => {
  return (
    <button
      onClick={onClick} // ✅ must be a prop here
      className={`${color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer `}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
          <div className="text-white text-2xl">{icon}</div>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-white/90 text-sm">{description}</p>
      </div>
    </button>
  );
};

export default QuickActionTile;
