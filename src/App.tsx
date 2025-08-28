import React from 'react';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './router/Router';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppRouter />
        <Toaster />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;