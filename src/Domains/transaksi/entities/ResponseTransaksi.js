class responseTransaksi {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      id, status, message,
    } = payload;
    this.id = id;
    this.status = status;
    this.message = message;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      id, status,
    } = payload;

    // veryfiy payload required
    if (!id || !status) {
      throw new Error('RESPONSE_TRANSAKSI.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof id !== 'string' || typeof status !== 'string') {
      throw new Error('RESPONSE_TRANSAKSI.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = responseTransaksi;
