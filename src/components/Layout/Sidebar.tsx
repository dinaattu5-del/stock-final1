
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  FileText, 
  BarChart3, 
  AlertTriangle,
  Settings,
  FileBarChart,
  ClipboardList
} from 'lucide-react';
import { useStockAlerts } from '../../hooks/useStockAlerts';

const menuItems = [
  { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard, path: '/admin' },
  { id: 'products', label: 'Produits', icon: Package, path: '/admin/products' },
  { id: 'clients', label: 'Clients', icon: Users, path: '/admin/clients' },
  { id: 'invoices', label: 'Factures', icon: FileText, path: '/admin/invoices' },
  { id: 'reports', label: 'Rapports', icon: FileBarChart, path: '/admin/reports' },
  { id: 'statistics', label: 'Statistiques', icon: BarChart3, path: '/admin/statistics' },
  { id: 'alerts', label: 'Alertes Stock', icon: AlertTriangle, path: '/admin/alerts' },
  { id: 'orders', label: 'Commandes', icon: ClipboardList, path: '/admin/orders' },
  { id: 'settings', label: 'Paramètres', icon: Settings, path: '/admin/settings' }
];

export function Sidebar() {
  const location = useLocation();
  const alerts = useStockAlerts();

  return (
    <div className="bg-slate-900 text-white p-4 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">StockManager</h1>
        <p className="text-slate-400 text-sm">Gestion de Stock Pro</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const hasAlerts = item.id === 'alerts' && alerts.length > 0;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
              {hasAlerts && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {alerts.length}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
