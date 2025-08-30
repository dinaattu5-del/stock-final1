<<<<<<< HEAD
=======

>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
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
<<<<<<< HEAD
  ClipboardList,
  QrCode
=======
  ClipboardList
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
} from 'lucide-react';
import { useStockAlerts } from '../../hooks/useStockAlerts';

const menuItems = [
  { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard, path: '/admin' },
<<<<<<< HEAD
  { id: 'my-app', label: 'Mon App', icon: QrCode, path: '/admin/my-app' },
=======
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
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
<<<<<<< HEAD
    <div className="bg-blue-900 text-blue-100 p-4 h-full overflow-y-auto shadow-lg"> {/* Changed background, text, added shadow */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-300">StockManager</h1> {/* Adjusted text color */}
        <p className="text-blue-200 text-sm">Gestion de Stock Pro</p> {/* Adjusted text color */}
=======
    <div className="bg-slate-900 text-white p-4 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-light">StockManager</h1>
        <p className="text-slate-400 text-sm">Gestion de Stock Pro</p>
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
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
<<<<<<< HEAD
                  ? 'bg-blue-700 text-white shadow-md' // Adjusted active background, removed scale for now
                  : 'text-blue-200 hover:bg-blue-800 hover:text-white' // Adjusted text and hover background
=======
                  ? 'bg-primary text-white shadow-lg transform scale-105' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
              {hasAlerts && (
<<<<<<< HEAD
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
=======
                <span className="ml-auto bg-danger text-white text-xs px-2 py-1 rounded-full">
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
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
