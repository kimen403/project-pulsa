const routes = require('./routes');
const ServicesHandler = require('./handler');

module.exports = {
  name: 'Services',
  version: '1.0.0',
  register: async (server, { container }) => {
    const servicesHandler = new ServicesHandler(container);
    server.route(routes(servicesHandler));
  },
};
