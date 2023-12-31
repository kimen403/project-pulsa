const crypto = require('crypto');

const hash = '18ee3a700dd3cdb7cef972bcb3e07066c15192e3408d5dc08e611660efdcf778b8e6ac0918d2bd6e26ccd9c4b15aec37f904fa550543b7e7baeadb617006af33';
const order_id = 'topup-bBG9Umt';
const gross_amount = '500000.00';
const status_code = '200';
const apiKey = 'SB-Mid-server-zoKgm0PtFQ3SHJAIXZWARBYT';
const hashObject = (order_id + status_code + gross_amount + apiKey);

function compareSHA512(hash1, hashObject2) {
  const sha512 = crypto.createHash('sha512').update(hashObject2).digest('hex');
  //   sha512.update(hashObject).digest('hex');
  if (hash1 !== sha512) {
    return false;
  }
  return true;
}

// Contoh penggunaan

const isEqual = compareSHA512(hash, hashObject);
console.log('Nilai hash sama:', isEqual);

function testNominal(nominal) {
  console.log('nominal', nominal);
  const nomina = parseFloat(nominal).toFixed(2);
  const nominal2 = +nomina;
  console.log('masuk update balance', nominal2);
  console.log(typeof nominal2);
}

testNominal('5000000.00');

const key = 'test';
const sha1 = crypto.createHash('sha1').update(key).digest('hex');

console.log('Hash SHA-1 dari "test": ', sha1);
