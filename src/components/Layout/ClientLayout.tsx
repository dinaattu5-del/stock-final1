import React from 'react';
import { Outlet } from 'react-router-dom';
import { ClientHeader } from './ClientHeader';

export function ClientLayout() {
  return (
<<<<<<< HEAD
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <ClientHeader />
        <main className="flex-1 overflow-y-auto">
=======
    <div className="flex h-screen bg-blue-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <ClientHeader />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
          <Outlet />
        </main>
      </div>
    </div>
  );
}