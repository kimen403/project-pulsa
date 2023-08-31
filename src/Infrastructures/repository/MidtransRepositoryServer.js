const fetch = require('node-fetch');
const MidtransRepository = require('../../Domains/midtrans/MidtransRepository');


class MidtransRepositoryServer extends MidtransRepository {
    constructor(settingsMidtrans, idGenerator, midtransCli) {
        super();
        this._midtrans = settingsMidtrans;
        this._idGenerator = idGenerator;
        this._midtransCli = midtransCli;
    }

    async createPayment(nominal, orderId) {
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: nominal
            },
            credit_card: {
                secure: true
            }
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