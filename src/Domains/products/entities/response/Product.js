class Product {
  constructor(payload) {
    // Payload Yang Di Terima
    this._verifyPayload(payload);
    const {
      id,
      product_name,
      price,
      category_id,
      buyer_sku_code,
      desc,
    } = payload;
    this.id = id;
    this.name = product_name;
    this.price = price;
    this.category = category_id;
    this.code = buyer_sku_code;
    this.desc = desc;
  }

  _verifyPayload(payload) {
    // Payload Yang Di Terima
    const {
      id,
      product_name: name,
      price,
      category_id: category,
      buyer_sku_code: code,
      desc,
    } = payload;

    // veryfiy payload required
    if (!id || !name || !price || !category || !code || !desc) {
      throw new Error('PRODUCTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    // veryfiy payload data type
    if (typeof name !== 'string' || typeof price !== 'number' || typeof category !== 'string' || typeof code !== 'string' || typeof desc !== 'string') {
      throw new Error('PRODUCTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Product;
