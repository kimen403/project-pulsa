const routes = (handler) => [
  {
    method: 'GET',
    path: '/price-list',
    handler: handler.postPriceListHandler,

  },
  {
    method: 'POST',
    path: '/topup',
    handler: handler.postTopupHandler,
    options: {
      auth: 'pulsa_jwt',
    },
  },
  {
    method: 'POST',
    path: '/pay',
    handler: handler.postPayHandler,
  },
  {
    method: 'POST',
    path: '/upload',
    handler: handler.postUploadHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },

  // {
  //     method: 'DELETE',
  //     path: '/threads/{threadId}/comments/{commentId}',
  //     handler: handler.deleteCommentHandler,
  //     options: {
  //         auth: 'forumapi_jwt',
  //     },
  // },
];

module.exports = routes;
