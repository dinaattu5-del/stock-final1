import React from 'react';
<<<<<<< HEAD
import { Bell, User, LogOut, Menu } from 'lucide-react';
import { useStockAlerts } from '../../hooks/useStockAlerts';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext'; // Import useApp
=======
import { Bell, Search, User, LogOut, Menu } from 'lucide-react';
import { useStockAlerts } from '../../hooks/useStockAlerts';
import { useAuth } from '../../context/AuthContext';
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
import { useNavigate } from 'react-router-dom';

export function Header({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const alerts = useStockAlerts();
  const { logout } = useAuth();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { state, clearPendingOrders } = useApp(); // Get state and clearPendingOrders from AppContext
=======
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
<<<<<<< HEAD

  // Use pendingOrdersCount from AppContext
  const totalNotifications = alerts.length + state.pendingOrdersCount;

  const handleBellClick = async () => {
    if (state.pendingOrdersCount > 0) {
      await clearPendingOrders();
    }
  };
  
  return (
    <header className="bg-blue-600 shadow-lg px-6 py-4">
=======
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onMenuToggle && (
            <button 
              onClick={onMenuToggle}
<<<<<<< HEAD
              className="lg:hidden p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
=======
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
            >
              <Menu size={24} />
            </button>
          )}
<<<<<<< HEAD
=======
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-80 transition-colors"
            />
          </div>
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
<<<<<<< HEAD
            <Bell 
              className="text-white cursor-pointer hover:text-blue-200 transition-all duration-200 transform hover:scale-110" 
              size={24} 
              onClick={handleBellClick}
            />
            {totalNotifications > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalNotifications}
=======
            <Bell className="text-gray-600 cursor-pointer hover:text-primary transition-colors" size={24} />
            {alerts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-colors">
                {alerts.length}
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
              </span>
            )}
          </div>
          
<<<<<<< HEAD
          <div className="flex items-center space-x-2 bg-blue-700 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-blue-800">
            <User className="text-white" size={20} />
            <span className="text-white font-medium">Admin</span>
            <button 
              onClick={handleLogout} // Re-added onClick
              className="text-white hover:text-blue-200 transition-all duration-200 p-1 rounded-full transform hover:scale-110"
              title="Déconnexion" // Re-added title attribute
=======
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <User className="text-gray-600" size={20} />
            <span className="text-gray-700 font-medium">Admin</span>
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-danger transition-colors p-1 rounded-full"
              title="Déconnexion"
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
