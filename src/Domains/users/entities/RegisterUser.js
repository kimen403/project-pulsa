class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { email, fullname ,username, noWa,pinKeamanan, password,kodeReferal } = payload;

    this.email = email;
    this.username = username;
    this.noWa = noWa;
    this.pinKeamanan = pinKeamanan;
    this.password = password;
    this.fullname = fullname;
    this.kodeReferal = kodeReferal;
  }

  _verifyPayload({ email, fullname ,username, noWa,pinKeamanan, password,kodeReferal }) {
    if (!email || !fullname || !username || !noWa || !pinKeamanan || !password ) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof noWa !=='number'|| typeof username !== 'string' || typeof password !== 'string' || typeof fullname !== 'string' || typeof email !== 'string' || typeof pinKeamanan !== 'number' ) {
      throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (!email.match(/^.+@.+$/)) {
      throw new Error('REGISTER_USER.EMAIL_NOT_VALID');
    }

    if (password.length < 6) {
      throw new Error('REGISTER_USER.PASSWORD_CHAR');
    }

    if (password.length > 50) {
      throw new Error('REGISTER_USER.PASSWORD_LIMIT_CHAR');
    }

    if (username.length < 5) {
      throw new Error('REGISTER_USER.USERNAME_CHAR');
    }

    if (username.length > 50) {
      throw new Error('REGISTER_USER.USERNAME_LIMIT_CHAR');
    }

    if (!username.match(/^[\w]+$/)) {
      throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER');
    }

    if (noWa.length < 10) {
      throw new Error('REGISTER_USER.NO_WA_CHAR');
    }

    if (noWa.length > 13) {
      throw new Error('REGISTER_USER.NO_WA_LIMIT_CHAR');
    }

    if (!noWa.match(/^[\w]+$/)) {
      throw new Error('REGISTER_USER.NO_WA_CONTAIN_RESTRICTED_CHARACTER');
    }
    
  }
}

module.exports = RegisterUser;
