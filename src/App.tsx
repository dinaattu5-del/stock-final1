import React from 'react';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './router/Router';

<<<<<<< HEAD
=======
import { Toaster } from 'react-hot-toast';

>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppRouter />
<<<<<<< HEAD
=======
        <Toaster />
>>>>>>> d99568ca8c711cd7b98459535f7510ace053f5aa
      </AppProvider>
    </AuthProvider>
  );
}

export default App;