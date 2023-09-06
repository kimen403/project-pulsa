const TransaksiRepository = require('../../Domains/transaksi/TransaksiRepository');

class TransaksiRepositoryPostgres extends TransaksiRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async createTransaksi(newTransaksi) {
    // const { title, body, owner } = newThread;
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

  // const id = `thread-${this._idGenerator()}`;
  // const date = new Date().toISOString();

  // const query = {
  //   text: 'INSERT INTO threads VALUES(Transaksi, , , , ) RETURNING id, title, owner',
  //   values: [id, title, body, date, owner],
  // };

  // const { rows } = await this._pool.query(query);
  // return new AddedThread(rows[0]);
}

//   async getThreadById(threadId) {
// const query = {
//   text: `SELECT threads.id,
//         threads.title,
//         threads.body,
//         threads.date,
//         users.username
//         FROM threads
//         LEFT JOIN users ON threads.owner = users.id
//         WHERE threads.id = Transaksi`,
//   values: [threadId],
// };

// const { rows, rowCount } = await this._pool.query(query);

// if (!rowCount) {
//   throw new NotFoundError('thread tidak ditemukan');
// }

// return rows[0];
//   }

//   async verifyAvailableThread(threadId) {
//   const query = {
//     text: 'SELECT 1 FROM threads WHERE id = Transaksi',
//     values: [threadId],
//   };

//   const { rowCount } = await this._pool.query(query);

//   if (!rowCount) {
//     throw new NotFoundError('thread tidak ditemukan');
//   }

//   return true;
//   }
// }

module.exports = TransaksiRepositoryPostgres;
