const routes = require('./routes');
const ServerAdminHandler = require('./handler');

module.exports = {
  name: 'ServerAdmin ',
  version: '1.0.0',
  register: async (server, { container }) => {
    const serverAdminHandler = new ServerAdminHandler(container);
    server.route(routes(serverAdminHandler));
  },
};
