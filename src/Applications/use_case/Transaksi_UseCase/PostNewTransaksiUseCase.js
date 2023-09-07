// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const { nanoid } = require('nanoid');
const NewTransaksi = require('../../../Domains/transaksi/entities/NewTransaksi');
const PostTransaksiDigi = require('../../../Domains/transaksi/entities/PostTransaksiDigi');
const TransaksiDatabase = require('../../../Domains/transaksi/entities/TransaksiDatabase');

// const AddedComment = require('../../../Domains/comments/entities/AddedComment');
// const NewComment = require('../../../Domains/comments/entities/NewComment');

class PostNewTransaksiUseCase {
  // constructor akan menerima parameter yang dikirimkan oleh dependency injection
  // Parameter adalah kumpulan fungsi yang dibutuhkan oleh use case
  // Contoh : commentRepository, threadRepository di butuhkan untuk menambahkan commentUseCase
  constructor({
    transaksiRepository, userRepository, idGenerator, hashGenerator, digiRepository,
  }) {
    this._transaksiRepository = transaksiRepository;
    this._userRepository = userRepository;
    this._idGenerator = nanoid;
    this._hashGenerator = hashGenerator;
    this._digiRepository = digiRepository;
  }

  async execute(useCasePayload, authUserId) {
    const newTransaksi = new NewTransaksi(useCasePayload);
    // cek harga produk
    const hargaProduk = await this._transaksiRepository.cekHargaProduk(newTransaksi.sku);
    // naikin harga
    const hargaJual = hargaProduk + hargaProduk * 0.1;
    console.log(`harga jual${hargaJual}`);
    // cek Saldo User
    await this._userRepository.cekSaldo(authUserId, hargaJual);
    // membuatId
    const id = `transaksi-${this._idGenerator(15)}`;
    const username = process.env.DIGI_USERNAME;
    const apiKey = process.env.DIGI_DEV_KEY;

    // NOTE - Mengurangi saldo user
    await this._userRepository.reudceSaldo(authUserId, hargaJual);

    // NOTE - Catat transaksi
    const transaksiDatabase = new TransaksiDatabase({
      id,
      idUser: authUserId,
      sku: newTransaksi.sku,
      customerRef: newTransaksi.customerRef,
      status: 'prossesing',
      testing: true,
    });
    await this._transaksiRepository.createTransaksi(transaksiDatabase);

    // membuat hash
    const hash2 = (username + apiKey + id);
    console.log(hash2);
    const hash = await this._hashGenerator.hashMd5(hash2);
    // console.log('');
    const newTransaksiEntity = new PostTransaksiDigi({
      username: process.env.DIGI_USERNAME,
      sku: newTransaksi.sku,
      customerNumber: newTransaksi.customerRef,
      refId: id,
      sign: hash,
      // test: true,
    });

    console.log(newTransaksiEntity);

    const addedTransaksi = await this._digiRepository.createTransaksi(newTransaksiEntity);
    return addedTransaksi;
    // const newComment = new NewComment(useCasePayload);
    // await this._threadRepository.verifyAvailableThread(newComment.threadId);

    // const addedComment = await this._commentRepository.addComment(newComment);
    // // console.log('newComment', newComment.threadId)
    // return new AddedComment(addedComment);
  }
}

module.exports = PostNewTransaksiUseCase;
