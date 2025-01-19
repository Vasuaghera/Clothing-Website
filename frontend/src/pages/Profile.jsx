import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { 
  IoPersonCircleOutline,
  IoMailOutline,
  IoKeyOutline,
  IoLogOutOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoCloseOutline,
  IoSaveOutline,
  IoBagOutline,
} from 'react-icons/io5'

const Profile = () => {
  const { navigate, setToken, setCartItems } = useContext(ShopContext);

  const [storedName, setStoredName] = useState(localStorage.getItem('username') || 'Guest');
  const [storedEmail] = useState(localStorage.getItem('useremail') || 'No Email Found');
  const [storedPass] = useState(localStorage.getItem('userpass') || 'No Password Found');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [showChangeName, setShowChangeName] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [newName, setNewName] = useState('');

  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

  const handleChangeName = () => {
    if (newName.trim()) {
      localStorage.setItem('username', newName);
      setStoredName(newName);
      setShowChangeName(false);
      alert('Username updated successfully!');
    } else {
      alert('Please enter a valid name.');
    }
  };

  const logout = () => {
    navigate('/login');
    localStorage.clear();
    setToken('');
    setCartItems({});
  };

  return (
    <div className="mt-16 min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="w-28 h-28 bg-gradient-to-br from-white/10 to-white/5 rounded-full mx-auto mb-6 
                        flex items-center justify-center ring-2 ring-white/10 ring-offset-2 ring-offset-black">
            <IoPersonCircleOutline className="w-16 h-16 text-white/70" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {storedName}
          </h1>
          <p className="text-gray-400 mt-2">Member since 2024</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => navigate('/orders')}
            className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-200
                     flex flex-col items-center gap-2 group"
          >
            <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
              <IoBagOutline className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-white">Orders</span>
          </button>
          <button 
            onClick={logout}
            className="p-4 bg-red-500/10 hover:bg-red-500/20 rounded-2xl transition-all duration-200
                     flex flex-col items-center gap-2 group"
          >
            <div className="p-3 bg-red-500/10 rounded-xl group-hover:scale-110 transition-transform">
              <IoLogOutOutline className="w-6 h-6 text-red-400" />
            </div>
            <span className="text-sm text-red-400">Logout</span>
          </button>
        </div>

        {/* Profile Information */}
        <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
          <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
          
          {/* Username */}
          <div className="space-y-4">
            <div className="relative">
              <label className="text-sm text-gray-400 mb-2 block">Username</label>
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <IoPersonCircleOutline className="w-5 h-5 text-white" />
                  <span>{storedName}</span>
                </div>
                <button
                  onClick={() => setShowChangeName(true)}
                  className="text-sm  transition-colors px-3 py-1 rounded-lg
                           bg-white/10 text-white hover:bg-white/20"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label className="text-sm text-gray-400 mb-2 block">Email</label>
              <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
                <IoMailOutline className="w-5 h-5 text-white" />
                <span>{storedEmail}</span>
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm text-gray-400 mb-2 block">Password</label>
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <IoKeyOutline className="w-5 h-5 text-white" />
                  <span>{isPasswordVisible ? storedPass : '••••••••'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePasswordVisibility}
                    className="p-2 bg-white/10 rounded-lg transition-colors"
                  >
                    {isPasswordVisible ? 
                      <IoEyeOffOutline className="w-5 h-5 text-white hover:bg-white/20 hover:text-gray-900" /> : 
                      <IoEyeOutline className="w-5 h-5 text-white hover:bg-white/20 hover:text-gray-900" />
                    }
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Name Modal */}
      {showChangeName && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-semibold mb-4">Change Username</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new username"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-white/20 text-white placeholder-gray-500"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowChangeName(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleChangeName}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showChangePass && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>
            <p className="text-gray-400 mb-4">Redirecting to password reset page...</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowChangePass(false);
                  navigate('/change-password');
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
