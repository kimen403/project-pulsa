// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class GetOneTransaksiHistoryUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ transaksiRepository }) {
    this._transaksiRepository = transaksiRepository;
    // this._commentRepository = commentRepository;
    // this._threadRepository= threadRepository;
  }

  async execute(useCasePayload) {
    const { idUser, idTransaksi } = useCasePayload;
    const historyTransaksi = await this._transaksiRepository.getOneHistoryTransaksiByIdUser(idUser, idTransaksi);
    return historyTransaksi;
    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
  }
}

module.exports = GetOneTransaksiHistoryUseCase;
