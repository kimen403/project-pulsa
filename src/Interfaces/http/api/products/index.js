const routes = require('./routes');
const ProductsHandler = require('./handler');

module.exports = {
  name: 'Products',
  version: '1.0.0',
  register: async (server, { container }) => {
    const productsHandler = new ProductsHandler(container);
    server.route(routes(productsHandler));
  },
};
