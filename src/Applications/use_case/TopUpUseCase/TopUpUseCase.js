// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const NewTopup = require("../../../Domains/topup/entities/NewTopup");

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');



class TopUpUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection 
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ midtransRepository }) {
    this._midtransRepository = midtransRepository;
    // this._threadRepository= threadRepository;
  }

  async execute(useCasePayload) {
    const newTopup = new NewTopup(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);
    const orderId = 'order-3'
    const response = await this._midtransRepository.createPayment(newTopup.jumlah, orderId);

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
    return response;
  }
}

module.exports = TopUpUseCase;