// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class CallBackUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ topUpRepository, hashGenerator }) {
    this._topUpRepository = topUpRepository;
    this._hashGenerator = hashGenerator;
    // this._threadRepository= threadRepository;
  }

  async execute(useCasePayload) {
    console.log('masuk usecase callback');
    const hashObject = (useCasePayload.order_id + useCasePayload.status_code + useCasePayload.gross_amount + process.env.MIDTRANS_SERVER_KEY);
    const hash = useCasePayload.signature_key;
    const res = await this._hashGenerator.compareSHA512(hash, hashObject);
    console.log('hasil compare', res);
    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
  }
}

module.exports = CallBackUseCase;
