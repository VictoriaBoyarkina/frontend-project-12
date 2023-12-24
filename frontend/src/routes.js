const apiPath = '/api/v1';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
  loginPage: () => ['/', 'login'].join(''),
  signupPage: () => ['/', 'signup'].join(''),
  notFoundPage: () => '*',
  chatPage: () => '/',
};
