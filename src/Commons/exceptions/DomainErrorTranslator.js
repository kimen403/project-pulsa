const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'UPDATE_DATA_CALLBACK.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat transaksi baru karena properti yang dibutuhkan tidak ada',
  ),
  'UPDATE_DATA_CALLBACK.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat transaksi baru karena tipe data tidak sesuai',
  ),
  'NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat authentication baru karena properti yang dibutuhkan tidak ada',
  ),
  'NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat authentication baru karena tipe data tidak sesuai',
  ),
  'POST_TRANSAKSI_DIGI.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat transaksi baru karena properti yang dibutuhkan tidak ada',
  ),
  'POST_TRANSAKSI_DIGI.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat transaksi baru karena tipe data tidak sesuai',
  ),
  'NEW_TRANSAKSI.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat transaksi baru karena properti yang dibutuhkan tidak ada',
  ),
  'NEW_TRANSAKSI.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat transaksi baru karena tipe data tidak sesuai',
  ),
  'PRODUCTS.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat product baru karena properti yang dibutuhkan tidak ada',
  ),
  'PRODUCTS.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat product baru karena tipe data tidak sesuai',
  ),

  'NEW_TOPUP.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat topup baru karena properti yang dibutuhkan tidak ada',
  ),
  'NEW_TOPUP.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat topup baru karena tipe data tidak sesuai',
  ),

  'NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada',
  ),
  'NEW_COMMENT.NOT_MEET_DATA_SPESIFICATION': new InvariantError(
    'tidak dapat membuat comment baru karena tipe data tidak sesuai',
  ),
  'DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada',
  ),
  'DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat thread baru karena Type Data tidak sesuai Silahkan cek kembali',
  ),
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada',
  ),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat user baru karena tipe data tidak sesuai',
  ),
  'REGISTER_USER.USERNAME_CHAR': new InvariantError(
    'tidak dapat membuat user baru karena karakter username kurang dari 5 karakter',
  ),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': new InvariantError(
    'tidak dapat membuat user baru karena karakter username melebihi batas limit',
  ),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError(
    'tidak dapat membuat user baru karena username mengandung karakter terlarang',
  ),
  'REGISTER_USER.PASSWORD_LIMIT_CHAR': new InvariantError(
    'tidak dapat membuat user baru karena karakter password melebihi batas limit',
  ),
  'REGISTER_USER.PASSWORD_CHAR': new InvariantError(
    'tidak dapat membuat user baru karena karakter password kurang dari 6 karakter',
  ),
  'REGISTER_USER.NO_WA_LIMIT_CHAR': new InvariantError(
    'tidak dapat membuat user baru karena karakter no wa melebihi batas limit',
  ),
  'REGISTER_USER.NO_WA_CONTAIN_RESTRICTED_CHARACTER': new InvariantError(
    'tidak dapat membuat user baru karena no wa mengandung karakter terlarang',
  ),

  'REGISTER_USER.NO_WA_CHAR': new InvariantError(
    'tidak dapat membuat user baru karena karakter no wa kurang dari 10 karakter',
  ),
  'REGISTER_USER.EMAIL_NOT_VALID': new InvariantError(
    'tidak dapat membuat user baru karena email tidak valid',
  ),
  'REGISTER_USER.USERNAME_ALREADY_EXISTS': new InvariantError(
    'tidak dapat membuat user baru karena username sudah digunakan',
  ),
  'REGISTER_USER.EMAIL_ALREADY_EXISTS': new InvariantError(
    'tidak dapat membuat user baru karena email sudah digunakan',
  ),
  'REGISTER_USER.NO_WA_ALREADY_EXISTS': new InvariantError(
    'tidak dapat membuat user baru karena no wa sudah digunakan',
  ),

  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'harus mengirimkan username dan password',
  ),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'username dan password harus string',
  ),
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvariantError('harus mengirimkan token refresh'),

  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('refresh token harus string'),

  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    new InvariantError('harus mengirimkan token refresh'),

  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    new InvariantError('refresh token harus string'),

  'NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError(
    'tidak dapat membuat thread baru karena Type Data tidak sesuai Silahkan cek kembali',
  ),
  'NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
    'tidak dapat membuat thread baru karena property tidak lengkap Silahkan cek kembali',
  ),
};

module.exports = DomainErrorTranslator;
