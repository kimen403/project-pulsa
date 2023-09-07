const HashMd5 = require('../../Applications/security/Md5PasswordHash');
const EncryptionHelper = require('../../Applications/security/PasswordHash');
const AuthenticationError = require('../../Commons/exceptions/AuthenticationError');

class CryptoHashMd5 extends HashMd5 {
  constructor(cryptoHash) {
    super();
    this._cryptoHash = cryptoHash;
  }

  async hashMd5(dataToHash) {
    // NOTE - hash data const dataToHash = username + apikey;
    return this._cryptoHash.createHash('md5').update(dataToHash).digest('hex');
  }

  async compareSHA512(hash, hashObject) {
    const sha512 = this._cryptoHash.createHash('sha512').update(hashObject).digest('hex');
    // sha512.update(hashObject).digest('hex');
    if (hash !== sha512) {
      throw new AuthenticationError('signature midtrans tidak valid');
    }
    return true;
  }

  //   async comparePassword(password, hashedPassword) {
  //     const result = await this._bcrypt.compare(password, hashedPassword);

//     if (!result) {
//       throw new AuthenticationError('kredensial yang Anda masukkan salah');
//     }
//   }
}

module.exports = CryptoHashMd5;

// const crypto = require('crypto');

// const username = '273KORYo';
// const apikey = 'ChdpjWRtel8QBnBTjCCdVLXAz6StTB3OASUSm93ZdQpdvnqsWWThzFverB5jIiwP';

// const dataToHash = username + apikey;
// const md5Hash = crypto.createHash('md5').update(dataToHash).digest('hex');

// console.log(md5Hash);
