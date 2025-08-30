import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Check, AlertCircle, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { supabase } from '../../lib/supabase';
import { OrderItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
<<<<<<< HEAD
=======
import { showErrorToast, showSuccessToast } from '../../utils/toastUtils';
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa

export function POS() {
  const { state } = useApp();
  const { profile } = useAuth();
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
<<<<<<< HEAD
  const [selectedCategory, setSelectedCategory] = useState('All'); // New state for category filter
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
=======
  const [loading, setLoading] = useState(false);
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa

  // Automatically validate client if logged in
  useEffect(() => {
    if (profile && profile.role === 'client') {
      // No need for clientValidated state, just use profile directly
    }
  }, [profile]);

<<<<<<< HEAD
  const uniqueCategories = ['All', ...new Set(state.products.map(product => product.category))];

  const filteredProducts = state.products.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });
=======
  const filteredProducts = state.products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.product_id === product.id);
    
    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const newItem: OrderItem = {
        id: Date.now().toString(),
        product_id: product.id,
        product_name: product.name,
        product_code: product.code,
        quantity: 1,
        price_ht: product.sale_price_ht, // Keep price for backend calculation
        vat_rate: product.vat_rate,     // Keep VAT for backend calculation
        total_ht: product.sale_price_ht,
        total_ttc: product.sale_price_ttc
      };
      setCart([...cart, newItem]);
    }
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(cart.map(item => {
      if (item.id === itemId) {
        const total_ht = item.price_ht * newQuantity;
        const total_ttc = total_ht * (1 + item.vat_rate / 100);
        return { ...item, quantity: newQuantity, total_ht, total_ttc };
      }
      return item;
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.total_ht, 0);
    const tax = cart.reduce((sum, item) => sum + (item.total_ht * item.vat_rate / 100), 0);
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const submitOrder = async () => {
    if (!profile || profile.role !== 'client' || cart.length === 0) return; // Ensure client is logged in

    setLoading(true);
    try {
      const { subtotal, tax, total } = calculateTotals();
      
<<<<<<< HEAD
      console.log('POS - profile:', profile); // Debug log
      console.log('POS - profile.name:', profile.name); // Debug log

      const orderData = {
        id: `CMD${Date.now()}`,
        client_vat_number: profile.vat_intra, // Use VAT from profile
        client_name: profile.name || '', // Changed from full_name to name
=======
      const orderData = {
        id: `CMD${Date.now()}`,
        client_vat_number: profile.vat_intra, // Use VAT from profile
        client_name: profile.full_name || '',
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
        items: cart,
        subtotal,
        tax,
        total,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      console.log('Submitting order for VAT:', profile.vat_intra);
      const { error } = await supabase
        .from('orders')
        .insert([orderData]);

      if (error) throw error;

<<<<<<< HEAD
      setMessage({ type: 'success', text: 'Commande envoyée avec succès!' });
      setCart([]);
      
      
    } catch (error) {
      console.error('Error submitting order:', error);
      setMessage({ type: 'error', text: 'Erreur lors de l\'envoi de la commande' });
=======
      showSuccessToast('Commande envoyée avec succès!');
      setCart([]);
      
    } catch (error: any) {
      console.error('Error submitting order:', error);
      showErrorToast(`Erreur lors de l\'envoi de la commande: ${error.message}`);
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
    } finally {
      setLoading(false);
    }
  };

  const { subtotal, tax, total } = calculateTotals();

<<<<<<< HEAD
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

=======
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Point de Vente</h1>
        <p className="text-gray-600 mt-1">Système de commande pour les clients</p>
      </div>

<<<<<<< HEAD
      {/* Message d'alerte */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${ 
          message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 
          'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <AlertCircle size={20} />
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6"> {/* Changed to 4 columns */}
        {/* Section Produits */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-6"> {/* Changed to span 3 columns */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Produits</h2>
            <div className="flex items-center space-x-4"> {/* Added a flex container for search and category */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[calc(100vh-200px)] overflow-y-auto"> {/* Increased height */}
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between items-center text-center"
                onClick={() => addToCart(product)}
              >
                <div className="mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${ 
                    product.category === 'BOISSON' ? 'bg-blue-100 text-blue-800' :
                    product.category === 'SNACK' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
=======
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section Produits */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Produits</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary w-80 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-3 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => addToCart(product)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${ 
                    product.category === 'BOISSON' ? 'bg-primary-light text-primary-dark' :
                    product.category === 'SNACK' ? 'bg-secondary-light text-secondary-dark' :
                    'bg-accent-light text-accent-dark'
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
                  }`}>
                    {product.category}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{product.code}</p>
                {/* Removed price and stock display */}
              </div>
            ))}
          </div>
        </div>

        {/* Panier */}
<<<<<<< HEAD
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit"> {/* Explicitly span 1 column */}
=======
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <ShoppingCart className="mr-2" size={24} />
            Panier ({cart.length})
          </h2>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Panier vide</p>
          ) : (
            <>
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product_name}</h4>
                      <p className="text-xs text-gray-600">{item.product_code}</p>
                      {/* Removed item total price */}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
<<<<<<< HEAD
                        className="p-1 text-gray-500 hover:text-red-600"
=======
                        className="p-1 text-gray-500 hover:text-danger transition-colors"
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
<<<<<<< HEAD
                        className="p-1 text-gray-500 hover:text-green-600"
=======
                        className="p-1 text-gray-500 hover:text-success transition-colors"
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
<<<<<<< HEAD
                        className="p-1 text-gray-500 hover:text-red-600 ml-2"
=======
                        className="p-1 text-gray-500 hover:text-danger transition-colors ml-2"
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Removed total calculations */}

              <button
                onClick={submitOrder}
                disabled={cart.length === 0 || loading}
<<<<<<< HEAD
                className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
=======
                className="w-full mt-4 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
              >
                {loading ? 'Envoi...' : 'Valider la Commande'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
