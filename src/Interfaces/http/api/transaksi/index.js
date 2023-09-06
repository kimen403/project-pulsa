const routes = require('./routes');
const TransaksiHandler = require('./handler');

module.exports = {
  name: 'Transaksi',
  version: '1.0.0',
  register: async (server, { container }) => {
    const transaksiHandler = new TransaksiHandler(container);
    server.route(routes(transaksiHandler));
  },
};
