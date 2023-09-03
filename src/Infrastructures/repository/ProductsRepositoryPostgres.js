const ProductsRepository = require('../../Domains/products/ProductsRepository');

class ProductsRepositoryPostgres extends ProductsRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async getAllProducts() {
    const query = {
      text: 'SELECT * FROM products',
    };
    const { rows } = await this._pool.query(query);
    return rows;
  }

  async getAllCategories() {
    const query = {
      text: 'SELECT * FROM category',
    };
    const { rows } = await this._pool.query(query);
    return rows;
  }

  async getAllProvidersByCategory(categoryId) {
    const query = {
      text: 'SELECT * FROM providers WHERE category_id = $1',
      values: [categoryId],
    };
    const { rows } = await this._pool.query(query);
    return rows;
  }

  async getAllProductsByProvider(providerId) {
    const query = {
      text: 'SELECT * FROM products WHERE provider_id = $1',
      values: [providerId],
    };

    const products = await this._pool.query(query);

    return products.rows;
  }

  async getBanner() {
    const query = {
      text: 'SELECT * FROM banner',
    };
    const { rows } = await this._pool.query(query);
    return rows;
  }

  async addBanner(url, description) {
    const id = `banner-${this._idGenerator(5)}`;
    const query = {
      text: 'INSERT INTO banner VALUES($1, $2) RETURNING id ,image_url',
      values: [id, url, description],
    };

    const { rows } = await this._pool.query(query);
    return rows[0];
  }
}

module.exports = ProductsRepositoryPostgres;
