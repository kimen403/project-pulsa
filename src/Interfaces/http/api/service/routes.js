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