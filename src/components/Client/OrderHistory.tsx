import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { Order } from '../../types';
import { OrderDetailsModal } from './OrderDetailsModal';
import { AddProductsModal } from './AddProductsModal';

export function OrderHistory() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isAddProductsModalOpen, setIsAddProductsModalOpen] = useState(false);

  const fetchOrders = async () => {
    if (profile && profile.vat_intra) {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('client_vat_number', profile.vat_intra);

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [profile]);

  const handleDetailsClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const handleAddProductsClick = (order: Order) => {
    setSelectedOrder(order);
    setIsAddProductsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsDetailsModalOpen(false);
    setIsAddProductsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleProductsAdded = () => {
    fetchOrders();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Mes commandes</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID de commande
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{order.id}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{order.total}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight`}
                      >
                        <span
                          aria-hidden
                          className={`absolute inset-0 ${
                            order.status === 'prepared' ? 'bg-green-200' : 'bg-yellow-200'
                          } opacity-50 rounded-full`}
                        ></span>
                        <span className="relative">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleDetailsClick(order)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Détails
                      </button>
                      {order.status !== 'prepared' && (
                        <button
                          onClick={() => handleAddProductsClick(order)}
                          className="text-green-600 hover:text-green-900 ml-4"
                        >
                          Ajouter des produits (Modifier)
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isDetailsModalOpen && selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={handleModalClose} />
      )}
      {isAddProductsModalOpen && selectedOrder && (
        <AddProductsModal
          order={selectedOrder}
          onClose={handleModalClose}
          onProductsAdded={handleProductsAdded}
        />
      )}
    </div>
  );
}