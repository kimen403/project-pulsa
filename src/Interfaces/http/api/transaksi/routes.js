const routes = (handler) => [
  {
    method: 'POST',
    path: '/v1/transaksi',
    handler: handler.postTransaksiHandler,
    options: {
      auth: 'pulsa_jwt',
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
