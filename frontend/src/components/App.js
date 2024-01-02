/* eslint-disable react/jsx-no-constructed-context-values */
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter, Routes, Route, Link,
} from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import ChatPage from './chat/ChatPage.js';
import SignupPage from './SignupPage.js';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import AuthProvider from './AuthProvider.js';
import PrivateRoute from './PrivateRoute.js';
import LogOutButton from './LogoutButton.js';
import { EmitsContext } from '../contexts';
import renderModal from './modals/index.js';
import routes from '../routes.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

const App = ({ i18n, socket }) => {
  const { modal } = useSelector((state) => state.modal);

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <I18nextProvider
            i18n={i18n}
            defaultNS="translation"
          >
            <BrowserRouter>
              <EmitsContext.Provider value={{ socket }}>
                <div
                  className="h-100"
                  id="chat"
                >
                  <div className="d-flex flex-column h-100">
                    <Navbar
                      expand="lg"
                      bg="white"
                      className="shadow-sm navbar navbar-light"
                    >
                      <div className="container">
                        <Navbar.Brand
                          as={Link}
                          to={routes.chatPage()}
                        >
                          {i18n.t('navBar.brand')}
                        </Navbar.Brand>
                        <LogOutButton
                          i18n={i18n}
                        />
                      </div>
                    </Navbar>
                    <Routes>
                      <Route
                        path={routes.chatPage()}
                        element={(
                          <PrivateRoute>
                            <ChatPage />
                          </PrivateRoute>
                        )}
                      />
                      <Route
                        path={routes.loginPage()}
                        element={<LoginPage />}
                      />
                      <Route
                        path={routes.signupPage()}
                        element={<SignupPage />}
                      />
                      <Route
                        path="*"
                        element={<NotFoundPage />}
                      />
                    </Routes>
                  </div>
                </div>
                <ToastContainer
                  position="top-right"
                />
                {renderModal(modal)}
              </EmitsContext.Provider>
            </BrowserRouter>
          </I18nextProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
