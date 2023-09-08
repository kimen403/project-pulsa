// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const NewTopup = require('../../../Domains/topup/entities/NewTopup');

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class TopUpUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ midtransRepository, topUpRepository }) {
    this._midtransRepository = midtransRepository;
    this._topUpRepository = topUpRepository;

    // this._threadRepository= threadRepository;
  }

  async execute(id, nominal) {
    console.log('masuk usecase topup');
    const newTopup = new NewTopup({ id, nominal });
    const userId = id;
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);
    const orderId = `topup-${this._midtransRepository._idGenerator(7)}`;
    await this._topUpRepository.createNewTopUp(newTopup.nominal, orderId, userId);
    const response = await this._midtransRepository.createPayment(newTopup.nominal, orderId);

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
    return response;
  }
}

module.exports = TopUpUseCase;
