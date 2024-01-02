import { useState } from 'react';
import { AuthContext } from '../contexts';

const AuthProvider = ({ children }) => {
  const saveToken = (token) => {
    localStorage.setItem('userId', token);
  };

  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, saveToken,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
