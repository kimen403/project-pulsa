// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class ValidateSignatureDigiUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ cryptoHash }) {
    this._cryptoHash = cryptoHash;
  }

  async execute(signature1, payloadData) {
    const secret = `${process.env.DIGIFLAZZ_API_SECRET_CALLBACK}`;
    const signature2 = await this._cryptoHash.createHmacSHA1(secret, payloadData);
    console.log('signature1', signature1);
    console.log('signature2', signature2);
    return this._cryptoHash.compareSHA1(signature1, signature2);
  }
}

module.exports = ValidateSignatureDigiUseCase;
