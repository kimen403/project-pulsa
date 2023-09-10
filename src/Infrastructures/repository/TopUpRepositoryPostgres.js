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
    const updatedat = new Date().toISOString();
    const query = {
      text: 'UPDATE history_topup SET status = $1 , updated_at =$3 WHERE id = $2 RETURNING id, status',
      values: [status, orderId, updatedat],
    };
    try {
      const result = await this._pool.query(query);
      console.log(result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new InvariantError('Gagal update status');
    }
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

  async getHistoryTopUpByUserId(userId) {
    const query = {
      text: 'SELECT * FROM history_topup WHERE id_user = $1 ORDER BY created_at DESC',
      values: [userId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = TopUpRepositoryPostgres;
