class NewTransaksi {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      sku, customerRef,
    } = payload;
    this.sku = sku;
    this.customerRef = customerRef;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      sku, customerRef,
    } = payload;

    // veryfiy payload required
    if (!sku || !customerRef) {
      throw new Error('NEW_TRANSAKSI.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof sku !== 'string' || typeof customerRef !== 'string') {
      throw new Error('NEW_TRANSAKSI.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewTransaksi;
