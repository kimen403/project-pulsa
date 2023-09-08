const TransaksiRepository = require('../../Domains/transaksi/TransaksiRepository');

class TransaksiRepositoryPostgres extends TransaksiRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async createTransaksi(newTransaksi) {
    const {
      id, idUser, sku, customerRef, status,
    } = newTransaksi;
    const query = {
      text: 'INSERT INTO transaksi VALUES($1,$2,$3,$4,$5)',
      values: [id, idUser, sku, customerRef, status],
    };
    await this._pool.query(query);
  }

  async cekHargaProduk(sku) {
    console.log('masuk cek harga produk', sku);
    const query = {
      text: 'SELECT price FROM products WHERE "buyer_sku_code" = $1',
      values: [sku],
    };
    const { rows } = await this._pool.query(query);
    console.log(`cek saldo berhasil${rows[0].price}`);
    return rows[0].price;
  }
}

module.exports = TransaksiRepositoryPostgres;
