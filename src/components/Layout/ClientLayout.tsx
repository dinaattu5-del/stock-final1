import React from 'react';
import { Outlet } from 'react-router-dom';
import { ClientHeader } from './ClientHeader';

export function ClientLayout() {
  return (
    <div className="flex h-screen bg-blue-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <ClientHeader />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}