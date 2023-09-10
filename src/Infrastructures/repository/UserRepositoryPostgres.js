const InvariantError = require('../../Commons/exceptions/InvariantError');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../Domains/users/UserRepository');

class UserRepositoryPostgres extends UserRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async verifyAvailableUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('username sudah digunakan');
    }
  }

  async verifyAvailableEmail(email) {
    const query = {
      text: 'SELECT email FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('email sudah digunakan silahkan gunakan email lain!');
    }
  }

  async addUser(registerUser) {
    // console.log('masuk Repository USer');
    const {
      username, fullname, noWa, email, password, pinKeamanan, kodeReferal,
    } = registerUser;
    const id = `user-${this._idGenerator(15)}`;
    const role = 'USER';

    const query = {
      text: 'INSERT INTO users VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id_user AS id, username, fullname',
      values: [id, fullname, username, noWa, email, password, pinKeamanan, kodeReferal, role],
    };
    const result = await this._pool.query(query);
    return new RegisteredUser(result.rows[0]);
  }

  async getPasswordByUsername(username) {
    const query = {
      text: 'SELECT password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('username tidak ditemukan');
    }

    return result.rows[0].password;
  }

  async getIdRoleSaldoByUsername(username) {
    // console.log('masuk get id role saldo by username');
    const query = {
      text: 'SELECT id_user AS id,fullname,username,email,role,saldo FROM users WHERE username = $1',
      values: [username],
    };

    const result2 = await this._pool.query(query);

    if (!result2.rowCount) {
      throw new InvariantError('user tidak ditemukan');
    }

    const result = result2.rows[0];
    // console.log(result);
    return result;
  }

  async cekSaldo(id, hargaJual) {
    console.log('masuk cek saldo');
    const query = {
      text: 'SELECT saldo FROM users WHERE id_user = $1',
      values: [id],
    };

    const result2 = await this._pool.query(query);

    if (!result2.rowCount) {
      throw new InvariantError('user tidak ditemukan');
    }

    const result = result2.rows[0];

    if (result.saldo < hargaJual) {
      throw new InvariantError('saldo tidak cukup');
    }
    // console.log(result);
    return result;
  }

  async reudceSaldo(id, hargaJual) {
    const query = {
      text: 'UPDATE users SET saldo = saldo - $1 WHERE id_user = $2 RETURNING saldo',
      values: [hargaJual, id],
    };
    try {
      const result = await this._pool.query(query);
      console.log('masuk reduce saldo');
      return result;
    } catch (error) {
      console.log(error);
    }
    const result2 = await this._pool.query(query);
    console.log('masuk reduce saldo');

    if (!result2.rowCount) {
      throw new InvariantError('user tidak ditemukan');
    }

    const result = result2.rows[0];
    // console.log(result);
    return result;
  }

  async updateBalance(idUser, nominal) {
    // eslint-disable-next-line radix
    console.log('nominal', nominal);
    const nomina = parseFloat(nominal).toFixed(2);
    const nominal2 = +nomina;
    console.log('masuk update balance', idUser.id_user, nominal2);
    console.log(typeof nominal2);
    const query = {
      text: 'UPDATE users SET saldo = saldo + $1 WHERE "id_user" = $2 RETURNING saldo',
      values: [nominal2, idUser.id_user],
    };
    try {
      const result = await this._pool.query(query);
      console.log('Successfully updated saldo:', result.rows[0]);
    } catch (error) {
      console.error('Error updating saldo:', error);
    }
  }

  async refundBalance(idUser, nominal) {
    const query = {
      text: 'UPDATE users SET saldo = saldo + $1 WHERE "id_user" = $2 RETURNING saldo',
      values: [nominal, idUser],

    };
    try {
      const result = await this._pool.query(query);
      console.log('Successfully updated saldo:', result.rows[0]);
    } catch (error) {
      console.error('Error updating saldo:', error);
    }
  }

  async getUserById(userId) {
    const query = {
      text: 'SELECT id_user AS id,fullname,username,email,role,saldo FROM users WHERE id_user = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('user tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = UserRepositoryPostgres;
