class NewTopup {
  constructor(payload) {
    this._verifyPayload(payload);
    // Payload Yang Di Terima
    const {
      nominal,
    } = payload;
    this.nominal = nominal;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      nominal,
    } = payload;

    // veryfiy payload required
    if (!nominal) {
      throw new Error('NEW_TOPUP.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof nominal !== 'number') {
      throw new Error('NEW_TOPUP.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }

    if (nominal < 10000) {
      throw new Error('NEW_TOPUP.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewTopup;
