import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ChatPage from './components/ChatPage.js';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import { Button, Navbar, Nav } from 'react-bootstrap';
import AuthContext from './contexts';
import useAuth from './hooks/index.js';

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
  useEffect(()  => {
    document.body.classList.add('bg-light', 'h-100')});
    
    useEffect(()  => {
      document.documentElement.classList.add('h-100')});

  return (
    <AuthProvider>
      <BrowserRouter>
            <div className='h-100' id='chat'>
                <div className='d-flex flex-column h-100'>
                  <Navbar expand='lg' bg='white' className='shadow-sm navbar navbar-light'>
                    <div className='container'>
                      <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
                    </div>
                  </Navbar>
                  <div className='container-fluid h-100'>
                    <div className='row justify-content-center align-content-center h-100'>
                      <Routes>
                        <Route path="/" element={(
                          <PrivateRoute>
                            <ChatPage/>
                          </PrivateRoute>
                        )} />  
                        <Route path="/login" element={<LoginPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                      </Routes>
                    </div>
                  </div>
                </div>
              </div>
    </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
