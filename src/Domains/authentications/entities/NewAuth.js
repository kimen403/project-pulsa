class NewAuth {
  constructor(payload) {
    // console.log(payload);
    this._verifyPayload(payload);

    this.accessToken = payload.accessToken;
    this.refreshToken = payload.refreshToken;
    this.role = payload.role;
    this.saldo = payload.saldoString;
  }

  _verifyPayload(payload) {
    const {
      accessToken, refreshToken, role, saldoString,
    } = payload;

    if (!accessToken || !refreshToken || !role || !saldoString) {
      throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    console.log('verifyPayload');

    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string' || typeof role !== 'string' || typeof saldoString !== 'string') {
      throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewAuth;
