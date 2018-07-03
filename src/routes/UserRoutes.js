/*
 * User Authentication routes
 */

module.exports = {
  '/signup': {
    post: {
      controller: 'UserController',
      method: 'signup',
    },
  },
  '/login': {
    post: {
      controller: 'UserController',
      method: 'login',
    },
  },
};
