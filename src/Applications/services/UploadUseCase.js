// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const { validateImageHeaders } = require('../../Domains/validator/image/uploads');

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class UploadUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ storageService }) {
    // this._commentRepository = commentRepository;
    // this._threadRepository= threadRepository;
    this._storageService = storageService;
  }

  async execute(useCasePayload) {
    // console.log('masuk ke usecase');
    await validateImageHeaders(useCasePayload.hapi.headers);
    const fileLocation = await this._storageService.writeFile(useCasePayload, useCasePayload.hapi);
    // console.log(fileLocation);
    return fileLocation;
  }
}

module.exports = UploadUseCase;
