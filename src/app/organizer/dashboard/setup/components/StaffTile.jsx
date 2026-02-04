// app/setup/components/StaffTile.jsx
import { FaUsers, FaSearch, FaPlus, FaEdit, FaTrash, FaEnvelope, FaPhone } from 'react-icons/fa';

const StaffTile = () => {
  const staffMembers = [
    { id: 1, name: "John Manager", role: "Venue Manager", email: "john@venue.com", phone: "+91 9876543210", status: "Active", color: "from-violet-500 to-purple-500" },
    { id: 2, name: "Sarah Chef", role: "Head Chef", email: "sarah@venue.com", phone: "+91 9876543211", status: "Active", color: "from-emerald-500 to-teal-500" },
    { id: 3, name: "Mike Server", role: "Lead Server", email: "mike@venue.com", phone: "+91 9876543212", status: "Active", color: "from-blue-500 to-cyan-500" },
    { id: 4, name: "Lisa Planner", role: "Event Planner", email: "lisa@venue.com", phone: "+91 9876543213", status: "On Leave", color: "from-amber-500 to-orange-500" }
  ];

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <FaUsers className="text-blue-600" />
            <span>Staff Management</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-1">Manage your team members</p>
        </div>
        
        <button className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-md transition-all duration-200 text-sm">
          <FaPlus /> <span>Add Staff</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staffMembers.map((staff) => (
          <div key={staff.id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${staff.color} rounded-lg flex items-center justify-center`}>
                  <FaUsers className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{staff.name}</h3>
                  <p className="text-gray-600 text-sm">{staff.role}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <FaEnvelope className="text-gray-400 text-sm" />
                    <span className="text-gray-600 text-xs">{staff.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <FaPhone className="text-gray-400 text-sm" />
                    <span className="text-gray-600 text-xs">{staff.phone}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  staff.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {staff.status}
                </span>
                <div className="flex items-center space-x-1 mt-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <FaEdit className="text-blue-600 text-sm" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <FaTrash className="text-rose-600 text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffTile;