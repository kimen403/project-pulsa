// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const UpdateDataCallback = require('../../../Domains/transaksi/entities/UpdateDataCallback');

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class UpdateStatusTransaksiUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ transaksiRepository, threadRepository }) {
    this._transaksiRepository = transaksiRepository;
  }

  async execute(useCasePayload) {
    const newUpdateDataPayload = new UpdateDataCallback(useCasePayload);
    console.log('newUpdateDataPayload', newUpdateDataPayload);
    switch (newUpdateDataPayload.status.toUpperCase()) {
      case 'success':
        await this._transaksiRepository.updateStatusTransaksiSukses(newUpdateDataPayload);
        break;
      case 'pending':
        await this._transaksiRepository.updateStatusTransaksi(newUpdateDataPayload);
        break;
      case 'gagal':
        await this._transaksiRepository.updateStatusTransaksiFailed(newUpdateDataPayload);
        break;
      default:
        break;
    }

    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
  }
}

module.exports = UpdateStatusTransaksiUseCase;
