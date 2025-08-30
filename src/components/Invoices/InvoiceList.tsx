<<<<<<< HEAD
import React, { useState } from 'react';
import { FileText, Plus, Eye, Download, Edit, RefreshCw, AlertTriangle, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InvoiceForm } from './InvoiceForm';
import { InvoicePDF } from './InvoicePDF';

export function InvoiceList() {
  const { state, refreshData } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
=======
import React, { useState, useEffect } from 'react';
import { FileText, Plus, Eye, Download, Edit, RefreshCw, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InvoiceForm } from './InvoiceForm';
import { InvoicePDF } from './InvoicePDF';
import { supabase } from '../../lib/supabase';

export function InvoiceList() {
  const { state, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) throw supabaseError;

      dispatch({ type: 'SET_INVOICES', payload: data || [] });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec du chargement des factures');
      console.error('Invoice fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setShowForm(true);
  };

  const handleView = (invoice) => {
    setViewingInvoice(invoice);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingInvoice(null);
  };

  const handleFormSave = () => {
<<<<<<< HEAD
    refreshData();
=======
    fetchInvoices(); // Recharger les factures après sauvegarde
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
    setShowForm(false);
    setEditingInvoice(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'paid': return 'Payée';
      case 'sent': return 'Envoyée';
      case 'overdue': return 'Échue';
      default: return 'Brouillon';
    }
  };

<<<<<<< HEAD
  const filteredInvoices = state.invoices.filter(invoice =>
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.client?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (state.loading && state.invoices.length === 0) {
=======
  if (loading && state.invoices.length === 0) {
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto">
          <RefreshCw className="m-auto" />
        </div>
        <p className="mt-2">Chargement des factures...</p>
      </div>
    );
  }

<<<<<<< HEAD
  console.log('showForm:', showForm);
  console.log('state.loading:', state.loading);
=======
  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex flex-col items-center text-center">
            <AlertTriangle className="text-red-500 h-12 w-12 mb-3" />
            <h3 className="text-lg font-medium text-red-800 mb-2">Erreur de chargement</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchInvoices}
              className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-2"
            >
              <RefreshCw size={16} />
              <span>Réessayer</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Factures</h1>
          <p className="text-gray-600 mt-1">Créez et gérez vos factures</p>
        </div>
        <button
          onClick={() => {
<<<<<<< HEAD
            console.log('Nouvelle Facture button clicked');
=======
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
            setEditingInvoice(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
<<<<<<< HEAD
          disabled={state.loading}
=======
          disabled={loading}
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
        >
          <Plus size={20} />
          <span>Nouvelle Facture</span>
        </button>
      </div>

<<<<<<< HEAD
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Rechercher une facture par numéro ou nom de client..."
          className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>

      {filteredInvoices.length === 0 ? (
=======
      {state.invoices.length === 0 ? (
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
        <div className="bg-white rounded-lg border p-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Aucune facture trouvée</h3>
          <p className="mt-1 text-gray-500">Commencez par créer votre première facture</p>
          <div className="mt-6">
            <button
              onClick={() => {
<<<<<<< HEAD
                console.log('Créer une facture button clicked');
=======
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
                setEditingInvoice(null);
                setShowForm(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus size={16} className="inline mr-1" />
              Créer une facture
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Facture
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'échéance
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
<<<<<<< HEAD
                {filteredInvoices.map((invoice) => (
=======
                {state.invoices.map((invoice) => (
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <FileText className="text-blue-600" size={20} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(invoice.created_at).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
<<<<<<< HEAD
                      {invoice.client?.name}
=======
                      {invoice.client_name}
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      €{invoice.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                        {getStatusLabel(invoice.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(invoice.due_date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleView(invoice)}
                          className="text-gray-600 hover:text-gray-900 p-1"
                          title="Voir"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(invoice)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleView(invoice)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Télécharger PDF"
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <InvoiceForm
          invoice={editingInvoice}
          onClose={handleFormClose}
          onSave={handleFormSave}
        />
      )}

      {viewingInvoice && (
        <InvoicePDF
          invoice={viewingInvoice}
          onClose={() => setViewingInvoice(null)}
        />
      )}
    </div>
  );
}
