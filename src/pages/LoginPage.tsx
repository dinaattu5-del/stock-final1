import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
=======
import { showErrorToast } from '../utils/toastUtils';
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa

type View = 'client' | 'admin';

export function LoginPage() {
  const [activeView, setActiveView] = useState<View>('client');
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [vatNumber, setVatNumber] = useState('');
<<<<<<< HEAD
  const [error, setError] = useState<string | null>(null);
=======
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
  const { loginWithPassword, loginWithVat, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && profile) {
      if (profile.role === 'admin') {
        navigate('/admin', { replace: true });
      } else if (profile.role === 'client') {
        navigate('/pos', { replace: true });
      }
    }
  }, [profile, loading, navigate]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    setError(null);
=======
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
    try {
      await loginWithPassword(email, password);
      // Redirection handled by useEffect
    } catch (err: any) {
<<<<<<< HEAD
      setError(err.message);
=======
      showErrorToast(err.message);
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
    }
  };

  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    setError(null);
=======
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
    try {
      await loginWithVat(vatNumber);
      // Redirection handled by useEffect
    } catch (err: any) {
<<<<<<< HEAD
      setError(err.message);
=======
      showErrorToast(err.message);
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
    }
  };

  const handleVatNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = `BE ${value.substring(2)}`;
    }
    setVatNumber(formattedValue);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md sm:max-w-sm">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setActiveView('client')}
            className={`px-4 py-2 rounded-l-lg ${activeView === 'client' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Client
          </button>
          <button
            onClick={() => setActiveView('admin')}
            className={`px-4 py-2 rounded-r-lg ${activeView === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Admin
          </button>
        </div>

<<<<<<< HEAD
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

=======
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
        {activeView === 'client' ? (
          <form onSubmit={handleClientLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vatNumber">
                VAT Number
              </label>
              <input
                type="text"
                id="vatNumber"
                value={vatNumber}
                onChange={handleVatNumberChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="BE 0123456789"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAdminLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
<<<<<<< HEAD
                Password
=======
                Mot de passe
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
<<<<<<< HEAD
                Sign In
=======
                Se connecter
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
