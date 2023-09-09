/* eslint-disable class-methods-use-this */
class HashMd5 {
  async compareHashMd5(plain, encrypted) {
    throw new Error('PASSWORD_HASH_MD5.METHOD_NOT_IMPLEMENTED');
  }

  async hashMd5(data) {
    throw new Error('PASSWORD_HASH_MD5.METHOD_NOT_IMPLEMENTED');
  }

  async compareSHA512(hash, hashObject) {
    throw new Error('PASSWORD_HASH_MD5.METHOD_NOT_IMPLEMENTED');
  }

  async createHmacSHA1(key, data) {
    throw new Error('PASSWORD_HASH_MD5.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = HashMd5;
