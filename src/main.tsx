import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from './components/ErrorBoundary/ErrorBoundaryFallback.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

const logError = (error: Error, info: { componentStack: string }) => {
  // You can log the error to an external service like Sentry, LogRocket, etc.
  console.error("Caught by Error Boundary:", error, info);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onError={logError}
      onReset={() => {
        // Reset the state of your app so the error doesn't happen again
        window.location.reload();
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);