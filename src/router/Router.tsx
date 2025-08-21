
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from '../components/Layout/AdminLayout';
import { ClientLayout } from '../components/Layout/ClientLayout';
import { LoginPage } from '../pages/LoginPage';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { ProductList } from '../components/Products/ProductList';
import { ClientList } from '../components/Clients/ClientList';
import { InvoiceList } from '../components/Invoices/InvoiceList';
import { Reports } from '../components/Reports/Reports';
import { Statistics } from '../components/Statistics/Statistics';
import { StockAlerts } from '../components/Alerts/StockAlerts';
import { Settings } from '../components/Settings/Settings';
import { POS } from '../components/POS/POS';
import { OrderManagement } from '../components/Orders/OrderManagement';
import { ProtectedRoute } from './ProtectedRoute';
import { OrderHistory } from '../components/Client/OrderHistory';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Client Routes */}
        <Route element={<ProtectedRoute allowedRoles={['client']} />}>
          <Route path="/" element={<ClientLayout />}>
            <Route path="pos" element={<POS />} />
            <Route path="order-history" element={<OrderHistory />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="clients" element={<ClientList />} />
            <Route path="invoices" element={<InvoiceList />} />
            <Route path="reports" element={<Reports />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="alerts" element={<StockAlerts />} />
            <Route path="settings" element={<Settings />} />
            <Route path="orders" element={<OrderManagement />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
