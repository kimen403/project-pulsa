class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      email, fullname, username, noWa, pinKeamanan, password, kodeReferal,
    } = payload;

    this.email = email;
    this.username = username;
    this.noWa = noWa;
    this.pinKeamanan = pinKeamanan;
    this.password = password;
    this.fullname = fullname;
    this.kodeReferal = kodeReferal;
  }

  _verifyPayload({
    email, fullname, username, noWa, pinKeamanan, password, kodeReferal,
  }) {
    if (!email || !fullname || !username || !noWa || !pinKeamanan || !password) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof noWa !== 'number' || typeof username !== 'string' || typeof password !== 'string' || typeof fullname !== 'string' || typeof email !== 'string' || typeof pinKeamanan !== 'number') {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RegisterUser;
