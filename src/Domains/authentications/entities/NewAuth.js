class NewAuth {
  constructor(payload) {
    // console.log(payload);
    this._verifyPayload(payload);

    this.id = payload.id;
    this.fullname = payload.fullname;
    this.username = payload.username;
    this.email = payload.email;
    this.role = payload.role;
    this.accessToken = payload.accessToken;
    this.refreshToken = payload.refreshToken;
    this.saldo = payload.saldo;
  }

  _verifyPayload(payload) {
    const {
      accessToken, refreshToken, role, saldo, fullname, username, email, id,
    } = payload;

    if (!accessToken || !refreshToken || !role || !fullname || !username || !email || !id) {
      throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string' || typeof role !== 'string' || typeof saldo !== 'string') {
      throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewAuth;
