const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
  loginPage: () => ['/', 'login'].join(''),
  signupPage: () => ['/', 'signup'].join(''),
  chatPage: () => '/',
};

export default routes;
