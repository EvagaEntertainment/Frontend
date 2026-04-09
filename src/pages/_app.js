import { Provider } from 'react-redux';
import store from '../context/redux/store';
import ErrorBoundary from '../components/Errors/ErrorBoundary';
import { AuthProvider } from '../context/AuthContext';
import { ErrorProvider } from '../context/ErrorContext';
import ErrorHandler from '../components/Errors/ErrorHandler';
import '../index.css';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
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
