class PostTransaksiDigi {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      username, sku, customerNumber, refId, sign, test,
    } = payload;
    this.username = username;
    this.buyer_sku_code = sku;
    this.customer_no = customerNumber;
    this.ref_id = refId;
    this.sign = sign;
    this.testing = test || true;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      username, sku, customerNumber, refId, sign, testing,
    } = payload;

    // veryfiy payload required
    if (!username || !sku || !customerNumber || !refId || !sign) {
      throw new Error('POST_TRANSAKSI_DIGI.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof username !== 'string' || typeof sku !== 'string' || typeof customerNumber !== 'string' || typeof refId !== 'string' || typeof sign !== 'string') {
      throw new Error('POST_TRANSAKSI_DIGI.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = PostTransaksiDigi;
