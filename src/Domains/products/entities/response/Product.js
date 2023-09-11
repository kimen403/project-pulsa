class Product {
  constructor(payload) {
    // Payload Yang Di Terima
    this._verifyPayload(payload);
    const {
      id,
      product_name,
      v1_price,
      v2_price,
      category_id,
      provider_id,
      buyer_sku_code,
      form_type,
      desc,
    } = payload;
    this.id = id;
    this.name = product_name;
    this.vip_price = v1_price;
    this.price = v2_price;
    this.category = category_id;
    this.provider = provider_id;
    this.code = buyer_sku_code;
    this.form_type = form_type;
    this.desc = desc;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      id,
      product_name: name,
      v1_price,
      category_id: category,
      buyer_sku_code: code,
      desc,
    } = payload;

    // veryfiy payload required
    if (!id || !name || !v1_price || !category || !code || !desc) {
      throw new Error('PRODUCTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof name !== 'string' || typeof v1_price !== 'number' || typeof category !== 'string' || typeof code !== 'string' || typeof desc !== 'string') {
      throw new Error('PRODUCTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Product;
