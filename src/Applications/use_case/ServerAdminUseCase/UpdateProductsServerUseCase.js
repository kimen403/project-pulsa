// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class UpdateProductsServerUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({ productsRepository }) {
    this._productsRepository = productsRepository;
    // this._threadRepository= threadRepository;
  }

  async execute(products) {
    // Mengumpulkan nama kategori unik dari array produk

    const categoriesDB = await this._productsRepository.getAllCategories();
    // console.log('categorydb', categoriesDB);

    const sku = await this._productsRepository.getAllSku();
    // console.log('sku', sku);
    const productsFiltered = products.filter((product) => !sku.some((dbSku) => dbSku === product.buyer_sku_code));
    // console.log('unik product', productsFiltered);

    const categories = Array.from(new Set(products.map((product) => product.category)));
    // console.log(categories);

    const uniqueCategory = categories.filter((category) => !categoriesDB.some((dbCategory) => dbCategory.category === category));
    // console.log(uniqueCategory);

    // console.log('unik kategory', uniqueCategory);
    // Mengumpulkan nama provider unik beserta kategori dari array produk
    const uniqueProviders = Array.from(new Set(products.map((product) => product.brand)));
    const uniqueProvidersWithCategory = uniqueProviders.map((provider) => {
      const { category } = products.find((product) => product.brand === provider);
      return { provider, category };
    });

    // console.log(uniqueProvidersWithCategory);
    // Fungsi untuk melakukan bulk insert data produk

    // Proses validasi dan bulk insert
    const insertData = async () => {
      await Promise.all(uniqueCategory.map((category) => this._productsRepository.addCategory(category)));
      // console.log('berhasil category');
      await Promise.all(uniqueProvidersWithCategory.map((providerCheck) => this._productsRepository.checkAndAddProvider(providerCheck)));
      // console.log('berhasil provider');
      await this._productsRepository.bulkInsertProducts(productsFiltered);
      // console.log('berhasil product');
    };

    await insertData().catch((err) => console.error('Error:', err));
    // tambah category

    // tambah provider

    // tambah product
    // console.log('berhasil');

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
  }
}

module.exports = UpdateProductsServerUseCase;
