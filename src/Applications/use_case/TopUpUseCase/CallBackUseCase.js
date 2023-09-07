// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class CallBackUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ topUpRepository, hashGenerator, userRepository }) {
    this._topUpRepository = topUpRepository;
    this._hashGenerator = hashGenerator;
    this._userRepository = userRepository;
    // this._threadRepository= threadRepository;
  }

  async execute(useCasePayload) {
    const hashObject = (useCasePayload.order_id + useCasePayload.status_code + useCasePayload.gross_amount + process.env.MIDTRANS_SERVER_KEY);
    const hash = useCasePayload.signature_key;
    console.log('masuk usecase callback');
    const res = await this._hashGenerator.compareSHA512(hash, hashObject);
    console.log('hasil compare', res);
    const userId = await this._topUpRepository.getUserId(useCasePayload.order_id);
    console.log('masuk switch');
    console.log('status', useCasePayload.transaction_status);
    if (res) {
      // Check if `res` is truthy before executing the switch statement
      // eslint-disable-next-line default-case
      switch (useCasePayload.transaction_status) {
        case 'settlement':
          // Perform actions for `settlement` case
          console.log('masuk settlement');
          await this._topUpRepository.updateStatus(useCasePayload.order_id, 'success');
          await this._userRepository.updateBalance(userId, parseInt(useCasePayload.gross_amount, 10));
          break;
        case 'capture':
          // Perform actions for `capture` case
          console.log('masuk capture');
          console.log('userId', userId);
          await this._topUpRepository.updateStatus(useCasePayload.order_id, 'success');
          await this._userRepository.updateBalance(userId, parseInt(useCasePayload.gross_amount, 2));
          break;
        case 'pending':
          // Perform actions for `pending` case
          await this._topUpRepository.updateStatus(useCasePayload.order_id, 'pending');
          break;
        case 'deny':
        case 'expire':
        case 'cancel':
          // Perform actions for `deny`, `expire`, and `cancel` cases
          await this._topUpRepository.updateStatus(useCasePayload.order_id, 'failed');
          break;
      }
    }

    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
  }
}

module.exports = CallBackUseCase;
