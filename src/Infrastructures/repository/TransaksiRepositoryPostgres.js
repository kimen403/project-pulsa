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

  async updateStatusTransaksiSukses(updateData) {
    console.log('masuk update status transaksi', updateData);
    const updatedat = new Date().toISOString();
    const query = {
      text: 'UPDATE transaksi SET status = $2, rc = $3, cs_telegram = $4, cs_wa = $5, sn = $6 WHERE id = $1',
      values: [updateData.id, updateData.status, updateData.rc, updateData.cs_telegram, updateData.cs_wa, updateData.sn, updatedat],
    };
    await this._pool.query(query);
  }

  async updateStatusTransaksiFailed(updateData) {
    console.log('masuk update status transaksi', updateData);
    const updatedat = new Date().toISOString();
    const queryUpdate = {
      text: 'UPDATE transaksi SET status = $2, rc = $3, cs_telegram = $4, cs_wa = $5, sn = $6 WHERE id = $1',
      values: [updateData.id, updateData.status, updateData.rc, updateData.cs_telegram, updateData.cs_wa, updateData.sn, updatedat],
    };
    await this._pool.query(queryUpdate);
    const hargaProduct = await this.cekHargaProduk(updateData.sku);
    const queryRefund = {
      text: 'UPDATE users SET saldo = saldo + $2 WHERE id = $1',
      values: [updateData.idUser, hargaProduct],
    };
    await this._pool.query(queryRefund);
  }
}

module.exports = TransaksiRepositoryPostgres;
