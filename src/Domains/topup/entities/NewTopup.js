class NewTopup {
  constructor(payload) {
    this._verifyPayload(payload);
    //Payload Yang Di Terima
    const {
      jumlah,
    } = payload;
    this.jumlah = jumlah;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      jumlah,
    } = payload;

    // veryfiy payload required
    if (!jumlah) {
      throw new Error('NEW_TOPUP.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof jumlah !== 'number') {
      throw new Error('NEW_TOPUP.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (jumlah < 10000) {
      throw new Error('NEW_TOPUP.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

  }
}

module.exports = NewTopup;