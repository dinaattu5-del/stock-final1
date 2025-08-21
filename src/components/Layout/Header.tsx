import React from 'react';
import { Bell, Search, User, LogOut, Menu } from 'lucide-react';
import { useStockAlerts } from '../../hooks/useStockAlerts';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Header({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const alerts = useStockAlerts();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onMenuToggle && (
            <button 
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <Menu size={24} />
            </button>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" size={24} />
            {alerts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {alerts.length}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
            <User className="text-gray-600" size={20} />
            <span className="text-gray-700 font-medium">Admin</span>
            <button 
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 transition-colors p-1 rounded-full"
              title="Déconnexion"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}