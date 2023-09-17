const routes = (handler) => ([
  {
    method: 'POST',
    path: '/login',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'POST',
    path: '/server/login',
    handler: handler.postAuthenticationServerHandler,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'POST',
    path: '/logout',
    handler: handler.deleteAuthenticationHandler,
    options: {
      auth: 'pulsa_jwt',
      plugins: {
        hacli: {
          permissions: ['USER'],
        },
      },
    },
  },
  {
    method: 'POST',
    path: '/server/logout',
    handler: handler.deleteAuthenticationHandler,
    options: {
      auth: 'pulsa_jwt',
      plugins: {
        hacli: {
          permissions: ['USER', 'ADMIN'],
        },
      },
    },
  },
]);

module.exports = routes;
