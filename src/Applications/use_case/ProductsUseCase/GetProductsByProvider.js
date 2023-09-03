// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const Product = require('../../../Domains/products/entities/response/Product');

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class GetProductsByProviderUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ productsRepository, threadRepository }) {
    this._productsRepository = productsRepository;
    // this._threadRepository= threadRepository;
  }

  async execute(idProvider) {
    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
    console.log('masuk usecase get products by provider');
    const products = await this._productsRepository.getAllProductsByProvider(idProvider);
    console.log('products', products);
    console.log('ini products data');
    const productsData = products.map((product) => new Product(product));
    console.log('productsData', productsData);
    return productsData;
  }
}

module.exports = GetProductsByProviderUseCase;
