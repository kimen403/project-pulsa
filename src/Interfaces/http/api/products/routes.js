const routes = (handler) => [
  {
    method: 'GET',
    path: '/products',
    handler: handler.getAllProductsHandler,
  },
  {
    method: 'GET',
    path: '/categories',
    handler: handler.getAllCategoriesHandler,
  },
  {
    method: 'GET',
    path: '/categories/{categoryId}/providers',
    handler: handler.getAllProvidersByCategoryHandler,
  },
  {
    method: 'GET',
    path: '/providers/{providerId}/products',
    handler: handler.getAllProductsByProviderHandler,
  },
  {
    method: 'GET',
    path: '/banner',
    handler: handler.getBannerHandler,
  },
  {
    method: 'GET',
    path: '/server/banner',
    handler: handler.getBannerHandler,
  },
  {
    method: 'POST',
    path: '/banner',
    handler: handler.postBannerHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
      },
    },
  },
  {
    method: 'GET',
    path: '/server/products',
    handler: handler.getAllServerProductsHandler,
    options: {
      auth: 'pulsa_jwt',
      plugins: {
        hacli: {
          permissions: ['ADMIN'],
        },
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
