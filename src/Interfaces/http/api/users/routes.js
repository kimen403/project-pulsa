const routes = (handler) => ([
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/me',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'pulsa_jwt',
    },
  },
]);

module.exports = routes;
