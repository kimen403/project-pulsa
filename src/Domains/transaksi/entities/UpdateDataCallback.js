class UpdateDataCallback {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      ref_id, status, message, rc, sn, tele, wa, buyer_sku_code,
    } = payload;
    this.id = ref_id;
    this.status = status;
    this.message = message;
    this.rc = rc;
    this.sn = sn;
    this.cs_telegram = tele;
    this.cs_wa = wa;
    this.sku = buyer_sku_code;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      ref_id, status, message, rc, sn, tele, wa,
    } = payload;
    console.log(rc, sn, tele, wa);
    // veryfiy payload required
    if (!ref_id || !status || !tele || !wa) {
      throw new Error('UPDATE_DATA_CALLBACK.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof ref_id !== 'string' || typeof status !== 'string' || typeof message !== 'string' || typeof rc !== 'string' || typeof sn !== 'string' || typeof tele !== 'string' || typeof wa !== 'string') {
      throw new Error('UPDATE_DATA_CALLBACK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UpdateDataCallback;
