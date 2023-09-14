const routes = (handler) => [
  {
    method: 'GET',
    path: '/update/products',
    handler: handler.getUpdateProductsHandler,
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
    path: '/topup/confirm',
    handler: handler.postConfirmHandler,
  },
  {
    method: 'POST',
    path: '/callback/digiflazz',
    handler: handler.postCallbackDigiflazzHandler,
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
];

module.exports = routes;
