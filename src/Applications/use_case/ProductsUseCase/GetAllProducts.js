// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const Product = require('../../../Domains/products/entities/response/Product');

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class GetAllProductsUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ productsRepository }) {
    this._productsRepository = productsRepository;
    // this._threadRepository= threadRepository;
  }

  async execute() {
    const products = await this._productsRepository.getAllProducts();
    const productsData = products.map((product) => new Product(product));
    return productsData;
  }
}

module.exports = GetAllProductsUseCase;
