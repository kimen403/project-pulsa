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

  async getHistoryTransaksiByIdUser(idUser) {
    const query = {
      text: 'SELECT id,sku,customer_ref,status FROM transaksi WHERE id_user = $1 ORDER BY created_at DESC',
      values: [idUser],
    };
    const { rows } = await this._pool.query(query);
    return rows;
  }

  async getOneHistoryTransaksiByIdUser(idUser, idTransaksi) {
    const query = {
      text: 'SELECT id,sku,customer_ref,status FROM transaksi WHERE id_user = $1 AND id = $2',
      values: [idUser, idTransaksi],
    };
    const { rows } = await this._pool.query(query);
    return rows;
  }

  async updateStatusTransaksi(updateData) {
    console.log('masuk update status transaksi', updateData);
    const updatedat = new Date().toDateString();
    const query = {
      text: 'UPDATE transaksi SET status = $2, rc = $3, cs_telegram = $4, cs_wa = $5, sn = $6 ,updated_at = $7, message =$8 WHERE id = $1',
      values: [updateData.id, updateData.status, updateData.rc, updateData.telegram, updateData.cs_wa, updateData.sn, updatedat, updateData.message],
    };
    try {
      await this._pool.query(query);
    } catch (error) {
      console.log(error);
    }
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

  async cekHargaProdukUser(sku) {
    console.log('masuk cek harga produk', sku);
    const query = {
      text: 'SELECT v2_price FROM products WHERE "buyer_sku_code" = $1',
      values: [sku],
    };
    const { rows } = await this._pool.query(query);
    console.log(`cek saldo berhasil${rows[0].v1_price}`);
    return rows[0].v2_price;
  }

  async cekHargaProdukVip(sku) {
    console.log('masuk cek harga produk', sku);
    const query = {
      text: 'SELECT v1_price FROM products WHERE "buyer_sku_code" = $1',
      values: [sku],
    };
    const { rows } = await this._pool.query(query);
    console.log(`cek saldo berhasil${rows[0].v1_price}`);
    return rows[0].v1_price;
  }

  async getUserIdByIdTransaksi(idTransaksi) {
    console.log('masuk get user id by id transaksi', idTransaksi);
    const query = {
      text: 'SELECT id_user FROM transaksi WHERE id = $1',
      values: [idTransaksi],
    };
    const { rows } = await this._pool.query(query);
    console.log(`Get User Id ${rows[0].id_user}`);
    return rows[0].id_user;
  }

  async updateStatusTransaksiSukses(updateData) {
    console.log('masuk update status transaksi', updateData);
    const updatedat = new Date().toISOString();

    const query = {
      text: 'UPDATE transaksi SET status = $2, rc = $3, cs_telegram = $4, cs_wa = $5, sn = $6 ,updated_at = $7, message =$8 WHERE id = $1',
      values: [updateData.id, updateData.status, updateData.rc, updateData.cs_telegram, updateData.cs_wa, updateData.sn, updatedat, updateData.message],
    };
    try {
      await this._pool.query(query);
    } catch (error) {
      console.log(error);
    }
  }

  async updateStatusTransaksiFailed(updateData) {
    console.log('masuk update status transaksi', updateData);
    const updatedat = new Date().toISOString();
    const queryUpdate = {
      text: 'UPDATE transaksi SET status = $2, rc = $3, cs_telegram = $4, cs_wa = $5, sn = $6 ,updated_at = $7, message =$8 WHERE id = $1',
      values: [updateData.id, updateData.status, updateData.rc, updateData.cs_telegram, updateData.cs_wa, updateData.sn, updatedat, updateData.message],
    };
    // update status transaksi
    await this._pool.query(queryUpdate);

    // refund saldo
    let hargaProduct;
    const idUser = await this.getUserIdByIdTransaksi(updateData.id);
    const role = await this.cekRoleUser(idUser);
    switch (role) {
      case 'USER':
        hargaProduct = await this.cekHargaProdukUser(updateData.sku);
        break;
      case 'VIP':
        hargaProduct = await this.cekHargaProdukVip(updateData.sku);
        break;
      default:
        break;
    }

    console.log('masuk refund saldo', updateData);
    console.log('harga product', hargaProduct);
    const queryRefund = {
      text: 'UPDATE users SET saldo = saldo + $2 WHERE id_user = $1',
      values: [idUser, hargaProduct],
    };
    try {
      await this._pool.query(queryRefund);
    } catch (error) {
      console.log(error);
    }
  }

  async cekRoleUser(idUser) {
    console.log('masuk cek role user', idUser);
    const query = {
      text: 'SELECT role FROM users WHERE id_user = $1',
      values: [idUser],
    };
    const { rows } = await this._pool.query(query);
    console.log(`Get User Id ${rows[0].role}`);
    return rows[0].role;
  }
}

module.exports = TransaksiRepositoryPostgres;
