const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const hacli = require('@antoniogiordano/hacli');

const ClientError = require('../../Commons/exceptions/ClientError');
const DomainErrorTranslator = require('../../Commons/exceptions/DomainErrorTranslator');

const users = require('../../Interfaces/http/api/users');
const authentications = require('../../Interfaces/http/api/authentications');
const service = require('../../Interfaces/http/api/service');
const products = require('../../Interfaces/http/api/products');
const transaksi = require('../../Interfaces/http/api/transaksi');

const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: hacli,
      options: {
        permissions: ['ADMIN'],
      },
    },
  ]);

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({
      value: 'Selamat datang di API topup ',
    }),
  });

  server.auth.strategy('pulsa_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
        permissions: artifacts.decoded.payload.role,
      },
    }),
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
    {
      plugin: products,
      options: { container },
    },
    {
      plugin: transaksi,
      options: { container },
    },
    // {
    //   plugin: threads,
    //   options: { container },
    // },
    // {
    //   plugin: comments,
    //   options: { container },
    // },
    {
      plugin: service,
      options: { container },
    },

  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof Error) {
      // bila response tersebut error, tangani sesuai kebutuhan
      const translatedError = DomainErrorTranslator.translate(response);

      // penanganan client error secara internal.
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!translatedError.isServer) {
        return h.continue;
      }

      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  return server;
};

module.exports = createServer;
