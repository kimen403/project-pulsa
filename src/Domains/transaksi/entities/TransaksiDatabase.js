class TransaksiDatabase {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      id, idUser, sku, customerRef, status,
    } = payload;
    this.id = id;
    this.idUser = idUser;
    this.sku = sku;
    this.customerRef = customerRef;
    this.status = status;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      id, idUser, sku, customerRef, status,
    } = payload;

    // veryfiy payload required
    if (!id || !idUser || !sku || !customerRef || !status) {
      throw new Error('TRANSAKSI_DATABASE.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof id !== 'string' || typeof idUser !== 'string' || typeof sku !== 'string' || typeof customerRef !== 'string' || typeof status !== 'string') {
      throw new Error('TRANSAKSI_DATABASE.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = TransaksiDatabase;
