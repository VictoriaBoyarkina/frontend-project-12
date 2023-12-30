import useAuth from '../hooks/index.js';

const LogOutButton = ({ i18n }) => {
  const auth = useAuth();
  const signOut = () => {
    auth.logOut();
    localStorage.clear();
  };

  return (
    auth.loggedIn ? (
      <button
        type="button"
        onClick={signOut}
        className="btn btn-primary rounded-1"
      >
        {i18n.t('buttons.logout')}
        {' '}
      </button>
    ) : null
  );
};

export default LogOutButton;
