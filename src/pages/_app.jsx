'use client';
if (typeof Promise.withResolvers === "undefined") {
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
import Script from 'next/script';
import '../index.css';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Script
        src="https://www.google.com/recaptcha/enterprise.js?render=6LcrQCotAAAAADGcQBjFWlPjW7X22_thFG4YdbJt"
        strategy="afterInteractive"
      />
      <Provider store={store}>
        <AuthProvider>
          <ErrorProvider>
            <ErrorHandler />
            <Component {...pageProps} />
          </ErrorProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default MyApp;

