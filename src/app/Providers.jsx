'use client';
if (typeof Promise.withResolvers === 'undefined') {
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}
import { Provider } from 'react-redux';
import store from '../context/redux/store';
import ErrorBoundary from '../components/Errors/ErrorBoundary';
import { AuthProvider } from '../context/AuthContext';
import { ErrorProvider } from '../context/ErrorContext';
import ErrorHandler from '../components/Errors/ErrorHandler';

export default function Providers({ children }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <ErrorProvider>
            <ErrorHandler />
            {children}
          </ErrorProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
}
