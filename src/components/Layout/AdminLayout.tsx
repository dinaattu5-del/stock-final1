import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
<<<<<<< HEAD
    <div className="flex h-screen bg-gray-50"> {/* Changed to a lighter background */}
      {/* Sidebar for larger screens, hidden by default on small screens */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}>
=======
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar for larger screens, hidden by default on small screens */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto lg:w-64`}>
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
        <Sidebar />
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

<<<<<<< HEAD
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-white rounded-lg shadow-sm m-4 lg:m-6"> {/* Added background, rounded corners, shadow, and margin */}
=======
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-64 transition-all duration-300 ease-in-out">
        <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
          <Outlet />
        </main>
      </div>
    </div>
  );
}