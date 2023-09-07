const fetch = require('node-fetch');
const MidtransRepository = require('../../Domains/midtrans/MidtransRepository');

class MidtransRepositoryServer extends MidtransRepository {
  constructor(settingsMidtrans, idGenerator, midtransCli) {
    super();
    this._midtrans = settingsMidtrans;
    this._idGenerator = idGenerator;
    this._midtransCli = midtransCli;
  }

  async createPayment(nominal, orderId, userId) {
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: nominal,
      },
      credit_card: {
        secure: true,
      },
      enabled_payments: ['credit_card',
        'echannel', 'qris',
        'other_va', 'gopay', 'indomaret',
        'shopeepay', 'kredivo'],
      item_details: [{
        id: 'Topup',
        price: nominal,
        quantity: 1,
        name: 'Topup Saldo',
        brand: 'Toko2up',
        category: 'topup',
        merchant_name: 'Toko2up',
      }],
    };

    const response = await this._midtransCli.createTransaction(parameter);
    return response;

    // const url = 'https://api.sandbox.midtrans.com/v1/payment-links';

    // const options = {
    //     method: 'POST',
    //     headers: {
    //         accept: 'application/json',
    //         'content-type': 'application/json',
    //         authorization: 'Basic U0ItTWlkLXNlcnZlci16b0tnbTBQdEZRM1NISkFJWFpXQVJCWVQ6'
    //     },
    //     body: JSON.stringify({
    //         transaction_details: { order_id: orderId, gross_amount: nominal },
    //         usage_limit: 2
    //     })
    // };
    // try {
    //     const newTopup = await fetch(url, options);
    //     const newTopupJson = await newTopup.json();
    //     return newTopupJson;
    // }
    // catch (error) {
    //     console.log(error);
    //     throw new Error('INTERNAL_SERVER_ERROR');
    // }
  }

  // async updateBalance(nominal, orderId) {
}

module.exports = MidtransRepositoryServer;
