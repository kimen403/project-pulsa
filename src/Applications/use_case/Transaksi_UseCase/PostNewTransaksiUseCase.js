// ADD MODEL DARI DOMAIN YANG SUDAH DI BUAT

const { nanoid } = require('nanoid');
const NewTransaksi = require('../../../Domains/transaksi/entities/NewTransaksi');
const PostTransaksiDigi = require('../../../Domains/transaksi/entities/PostTransaksiDigi');
const TransaksiDatabase = require('../../../Domains/transaksi/entities/TransaksiDatabase');
const UpdateDataCallback = require('../../../Domains/transaksi/entities/UpdateDataCallback');
const ResponseTransaksi = require('../../../Domains/transaksi/entities/ResponseTransaksi');

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
    console.log(`harga jual${hargaProduk}`);
    const hargaJual = hargaProduk + hargaProduk * 0.1;
    // cek Saldo User
    await this._userRepository.cekSaldo(authUserId, hargaJual);
    // membuatId
    const id = `transaksi-${this._idGenerator(15)}`;
    const username = process.env.DIGI_USERNAME;
    const apiKey = process.env.DIGI_DEV_KEY;
    console.log(`id${id}`);
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

    const responseServer = await this._digiRepository.createTransaksiToServer(newTransaksiEntity);

    console.log('responseServer', responseServer.data);
    console.log(responseServer.data.status.toLowerCase());
    const newUpdateDataPayload = new UpdateDataCallback(responseServer.data);
    switch (responseServer.data.status.toLowerCase()) {
      case 'sukses':
        console.log('masuk update status transaksi', newUpdateDataPayload);
        await this._transaksiRepository.updateStatusTransaksiSukses(newUpdateDataPayload);
        return new ResponseTransaksi({
          id: newUpdateDataPayload.id,
          status: 'sukses',
          message: 'Transaksi Berhasil',
        });
      case 'gagal':
        await this._transaksiRepository.updateStatusTransaksiFailed(newUpdateDataPayload);
        // await this._userRepository.refundBalance(authUserId, hargaJual);
        return new ResponseTransaksi({
          id: newUpdateDataPayload.id,
          status: 'gagal',
          message: 'Transaksi Gagal',
        });
      case 'pending':
        return new ResponseTransaksi({
          id: newUpdateDataPayload.id,
          status: 'pending',
          message: 'Transaksi Pending',
        });
      default:
        return 'gagal';
    }
  }
}

module.exports = PostNewTransaksiUseCase;
