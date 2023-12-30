import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : (
      <Navigate
        to={routes.loginPage()}
        state={{ from: location }}
      />
    )
  );
};

export default PrivateRoute;
