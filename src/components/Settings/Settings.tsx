import React, { useState } from 'react';
import { Save, Upload, Download, Settings as SettingsIcon, Building2, Palette } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CompanySettings } from '../../types';
import { supabase } from '../../lib/supabase';
import { ImportClients } from './ImportClients';
import { ImportProducts } from './ImportProducts';

export function Settings() {
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState('company');
  const [loading, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<CompanySettings>>(
    state.settings || {
      company_name: 'StockManager Pro',
      address: '123 Rue du Commerce',
      postal_code: '75001',
      city: 'Paris',
      country: 'France',
      phone: '+33 1 23 45 67 89',
      email: 'contact@stockmanager.fr',
      website: 'www.stockmanager.fr',
      siret: '123 456 789 00012',
      ape_code: '4651Z',
      vat_number: 'FR12345678901',
      primary_color: '#3B82F6',
      secondary_color: '#1E40AF'
    }
  );

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const settingsData = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      if (state.settings?.id) {
        const { error } = await supabase
          .from('company_settings')
          .update(settingsData)
          .eq('id', state.settings.id);
        
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('company_settings')
          .insert([settingsData])
          .select()
          .single();
        
        if (error) throw error;
        if (data) {
          dispatch({ type: 'SET_SETTINGS', payload: data });
        }
      }

      alert('Paramètres sauvegardés avec succès !');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'company', label: 'Entreprise', icon: Building2 },
    { id: 'invoice', label: 'Facture', icon: SettingsIcon },
    { id: 'import', label: 'Import/Export', icon: Upload }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-1">Configuration de l'application</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Company Settings */}
      {activeTab === 'company' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations de l'Entreprise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'entreprise
              </label>
              <input
                type="text"
                value={formData.company_name || ''}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code postal
              </label>
              <input
                type="text"
                value={formData.postal_code || ''}
                onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ville
              </label>
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site web
              </label>
              <input
                type="url"
                value={formData.website || ''}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SIRET
              </label>
              <input
                type="text"
                value={formData.siret || ''}
                onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Code APE
              </label>
              <input
                type="text"
                value={formData.ape_code || ''}
                onChange={(e) => setFormData({ ...formData, ape_code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de TVA
              </label>
              <input
                type="text"
                value={formData.vat_number || ''}
                onChange={(e) => setFormData({ ...formData, vat_number: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {/* Invoice Settings */}
      {activeTab === 'invoice' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
            <Palette size={20} />
            <span>Personnalisation des Factures</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Couleur principale
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.primary_color || '#3B82F6'}
                  onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primary_color || '#3B82F6'}
                  onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Couleur secondaire
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.secondary_color || '#1E40AF'}
                  onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.secondary_color || '#1E40AF'}
                  onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Aperçu</h3>
            <div 
              className="h-20 rounded-lg flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: formData.primary_color || '#3B82F6' }}
            >
              En-tête de Facture
            </div>
          </div>
        </div>
      )}

      {/* Import/Export */}
      {activeTab === 'import' && (
        <div className="space-y-6">
          <ImportClients />
          <ImportProducts />
        </div>
      )}

      {/* Save Button */}
      {(activeTab === 'company' || activeTab === 'invoice') && (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <Save size={16} />
            <span>{loading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
          </button>
        </div>
      )}
    </div>
  );
}