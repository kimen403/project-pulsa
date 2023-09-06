/* eslint-disable class-methods-use-this */
class PasswordHash {
  async hash(password) {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }

  async comparePassword(plain, encrypted) {
    throw new Error('PASSWORD_HASH.METHOD_NOT_IMPLEMENTED');
  }

  async hashMd5(data) {
    throw new Error('PASSWORD_HASH_MD5.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = PasswordHash;
