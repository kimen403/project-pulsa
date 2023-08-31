const fetch = require('node-fetch');

const url = 'https://api.sandbox.midtrans.com/v1/payment-links';
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Basic U0ItTWlkLXNlcnZlci16b0tnbTBQdEZRM1NISkFJWFpXQVJCWVQ6'
  },
  body: JSON.stringify({
    transaction_details: {order_id: 'concert-ticket-01', gross_amount: 100000},
    usage_limit: 2
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));