const InvariantError = require('../../Commons/exceptions/InvariantError');
const TopUpRepository = require('../../Domains/topup/TopUpRepository');

class TopUpRepositoryPostgres extends TopUpRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async createNewTopUp(nominal, orderId, userId) {
    const status = 'processing...';
    const query = {
      text: 'INSERT INTO history_topup VALUES($1, $2, $3, $4) RETURNING id, status',
      values: [orderId, userId, nominal, status],
    };
    try {
      await this._pool.query(query);
    } catch (error) {
      throw new InvariantError('Gagal topup silahkan coba lagi!');
    }
  }

  async updateStatus(orderId, status) {
    const query = {
      text: 'UPDATE history_topup SET status = $1 WHERE id = $2 RETURNING id, status',
      values: [status, orderId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Gagal update status');
    }
    return result.rows[0];
  }

  async getUserId(orderId) {
    const query = {
      text: 'SELECT id_user FROM history_topup WHERE id = $1',
      values: [orderId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Gagal update status');
    }
    return result.rows[0];
  }
}

module.exports = TopUpRepositoryPostgres;
