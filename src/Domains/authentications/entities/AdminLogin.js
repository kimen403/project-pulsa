class AdminLogin {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      fullname,
      accessToken,
      refreshToken,
    } = payload;
    this.fullname = fullname;
    this.token = accessToken;
    this.refreshToken = refreshToken;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      fullname,
      accessToken: token,
      refreshToken,
    } = payload;

    // veryfiy payload required
    if (!fullname || !token || !refreshToken) {
      throw new Error('ADMIN_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof fullname !== 'string' || typeof token !== 'string' || typeof refreshToken !== 'string') {
      throw new Error('ADMIN_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AdminLogin;
