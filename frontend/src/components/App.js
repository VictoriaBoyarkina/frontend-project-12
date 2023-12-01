import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../routes.js';
import ChatPage from './ChatPage.js';
import LoginPage from './LoginPage';
import NotFoundPage from './NotFoundPage';
import { Navbar } from 'react-bootstrap';
import { AuthContext, EmitsContext } from '../contexts';
import useAuth from '../hooks/index.js';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../store/channelsSlice.js';
import { actions as currentChannelActions } from '../store/currentChannelSlice.js';
import { actions as messagesActions } from '../store/messagesSlice.js';

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
  const socket = io();

  socket.on('message', (message) => {
    console.log(message); 
  });

  useEffect(()  => {
    document.body.classList.add('bg-light', 'h-100')});
    
    useEffect(()  => {
      document.documentElement.classList.add('h-100')});

    const dispatch = useDispatch();

    const getAuthHeader = () => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        if (userId && userId.token) {
          return { Authorization: `Bearer ${userId.token}` };
        }
        return {};
    };
  
  useEffect(() => {
    const fetchData = async () => {
    await axios.get(routes.usersPath(), { headers: getAuthHeader() })
    .then(({data}) => {
      const {
        channels,
        currentChannelId,
        messages,
      } = data;

      const currentChannel = channels.find((channel) => channel.id === currentChannelId)

      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
      dispatch(currentChannelActions.setCurrentChannel(currentChannel));
    })
    .catch((err) => console.log(err))
    
    }
    fetchData()
  }, [dispatch]);

  const LogOutButton = () => {
    const auth = useAuth();
  
    return (
      auth.loggedIn ? <button type="button" onClick={auth.logOut} className="btn btn-primary">Выйти</button> : null
    );
  };

  return (
      <AuthProvider>
            <BrowserRouter>
                  <div className='h-100' id='chat'>
                      <div className='d-flex flex-column h-100'>
                        <Navbar expand='lg' bg='white' className='shadow-sm navbar navbar-light'>
                          <div className='container'>
                            <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
                            <LogOutButton/>
                          </div>
                        </Navbar>
                        <EmitsContext.Provider value={{socket}}>
                          <Routes>
                              <Route path="/" element={(
                                <PrivateRoute>
                                  <ChatPage/>
                                </PrivateRoute>
                              )} />  
                              <Route path="/login" element={<LoginPage />} />
                              <Route path='*' element={<NotFoundPage />} />
                          </Routes>
                        </EmitsContext.Provider>
                      </div>
                    </div>
          </BrowserRouter>
          </AuthProvider>
    
    
  );
}

export default App;
