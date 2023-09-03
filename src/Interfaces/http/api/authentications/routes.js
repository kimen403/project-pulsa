const routes = (handler) => ([
  {
    method: 'POST',
    path: '/login',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
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
]);

module.exports = routes;
