import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import { Button, Navbar, Nav } from 'react-bootstrap';

function App() {
  useEffect(()  => {
    document.body.classList.add('bg-light', 'h-100')});
    
    useEffect(()  => {
      document.documentElement.classList.add('h-100')});

  return (
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
                  <Route path="/" element={null} />  
                  <Route path="/login" element={<LoginPage />} />
                  <Route path='*' element={<NotFoundPage />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
