const midtransClient = require('midtrans-client');

const midtransCli = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

module.exports = midtransCli;