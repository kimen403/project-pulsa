// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class UploadBannerUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ productsRepository }) {
    this._productRepository = productsRepository;
    // this._threadRepository= threadRepository;
  }

  async execute(urlProduct, description) {
    console.log('uploadBannerUseCase', urlProduct, description);
    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);
    console.log(this._productRepository);
    const newBanner = await this._productRepository.addBanner(urlProduct, description);
    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
    return newBanner;
  }
}

module.exports = UploadBannerUseCase;
