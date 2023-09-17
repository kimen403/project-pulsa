class TransaksiServerResponse {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      id,
      updated_at,
      id_user,
      cs_wa,
      cs_telegram,
      message,
      sku,
      sn,
      rc,
      status,

    } = payload;
    this.idUser = id_user;
    this.idTransaksi = id;
    this.tanggal = updated_at;
    this.csWa = cs_wa;
    this.csTelegram = cs_telegram;
    this.keterangan = message;
    this.sku = sku;
    this.rc = rc;
    this.sn = sn;
    this.status = status;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      id,
    } = payload;

    // veryfiy payload required
    if (!id) {
      throw new Error('NEW_MODEL.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof id !== 'string') {
      throw new Error('NEW_MODEL.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = TransaksiServerResponse;
