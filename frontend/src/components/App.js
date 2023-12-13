import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18next from './../i18next.js'
import ChatPage from './chat/ChatPage.js';
import SignupPage from './SignupPage.js';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import { Navbar } from 'react-bootstrap';
import { AuthContext, EmitsContext } from '../contexts';
import useAuth from '../hooks/index.js';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsActions } from '../store/channelsSlice.js';
import { actions as messagesActions } from '../store/messagesSlice.js';
import getModal from './modals/index.js';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { actions as currentChannelIdActions } from '../store/currentChannelIdSlice.js';

const rollbarConfig = {
  accessToken: '1d2a52991db34aa89efbdd8df5e0651a',
  environment: 'production',
  };

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {
  const dispatch = useDispatch();

  const { currentChannelId } = useSelector((state) => state.currentChannelId);

  const socket = io({
  });

  socket.on('newMessage', (message) => {
    dispatch(messagesActions.addMessage(message));
  });

  socket.on('newChannel', (channel) => {
    dispatch(channelsActions.addChannel(channel));
    dispatch(currentChannelIdActions.setCurrentChannelId(channel.id));
  });

  socket.on('removeChannel', (channel) => {
    if (channel.id === currentChannelId) {
      dispatch(currentChannelIdActions.setCurrentChannelId(1));
  }
    dispatch(channelsActions.removeChannel(channel.id));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(channelsActions.updateChannel({
      id: channel.id,
      changes: {
        name: channel.name,
      },
    }));
  });

  useEffect(()  => {
    document.body.classList.add('bg-light', 'h-100')});
    
    useEffect(()  => {
      document.documentElement.classList.add('h-100')});

  const LogOutButton = () => {
    const auth = useAuth();
    const signOut = () => {
      auth.logOut();
      localStorage.clear()
    }
    
    return (
      auth.loggedIn ? <button type="button" onClick={signOut} className="btn btn-primary rounded-1">{i18next.t('buttons.logout')}</button> : null
    );
  };

  const { modal } = useSelector((state) => state.modal);

  const renderModal = () => {
    if (!modal.active) {
      return null;
    }
    const Component = getModal(modal.name);
    return <Component/>;
  };

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <AuthProvider>
          <I18nextProvider i18n={i18next} defaultNS={'translation'}>
            <BrowserRouter>
                  <EmitsContext.Provider value={{socket}}>
                      <div className='h-100' id='chat'>
                          <div className='d-flex flex-column h-100'>
                            <Navbar expand='lg' bg='white' className='shadow-sm navbar navbar-light'>
                              <div className='container'>
                                <Navbar.Brand as={Link} to="/">{i18next.t('navBar.brand')}</Navbar.Brand>
                                <LogOutButton/>
                              </div>
                            </Navbar>
                              <Routes>
                                  <Route path="/" element={(
                                    <PrivateRoute>
                                      <ChatPage/>
                                    </PrivateRoute>
                                  )} />  
                                  <Route path="/login" element={<LoginPage />} />
                                  <Route path='/signup' element={<SignupPage />} />
                                  <Route path='*' element={<NotFoundPage />} />
                              </Routes>
                          </div>
                        </div>
                        <ToastContainer 
                        position="top-right"
                        />
                      {renderModal()}
                  </EmitsContext.Provider>
            </BrowserRouter>
          </I18nextProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Provider>
  )
}

export default App;
