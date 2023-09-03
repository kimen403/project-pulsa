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
}

module.exports = ProductsRepositoryPostgres;
