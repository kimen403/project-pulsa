// const { nanoid } = require('nanoid');
const ProductsRepository = require('../../Domains/products/ProductsRepository');
const Product = require('../../Domains/products/entities/response/Product');

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

  async getAllProviders() {
    const query = {
      text: 'SELECT * FROM providers',
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
      text: 'INSERT INTO banner VALUES($1, $2,$3) RETURNING id ,image_url',
      values: [id, url, description],
    };

    const { rows } = await this._pool.query(query);
    return rows[0];
  }

  async checkAndAddCategory(category) {
    const { rowCount } = await this._pool.query('SELECT * FROM category WHERE category = $1', [category]);
    // console.log('ini rowcount', rowCount);
    if (rowCount === 0) {
      const id = this._idGenerator(5);
      await this._pool.query('INSERT INTO category VALUES ($1,$2)', [id, category]);
    }
  }

  async addCategory(category) {
    const id = `category-${this._idGenerator(5)}`;
    const query = {
      text: 'INSERT INTO category VALUES($1, $2) RETURNING id ,category',
      values: [id, category],
    };
    const { rows } = await this._pool.query(query);
    return rows[0];
  }

  async checkAndAddProvider(data) {
    const { rowCount } = await this._pool.query('SELECT * FROM providers WHERE provider = $1', [data.provider]);
    if (rowCount === 0) {
      const id = this._idGenerator(5);
      const { provider } = data;
      const categoryId = await this.getCategoryIdByName(data.category);
      await this._pool.query('INSERT INTO providers (id,provider,category_id) VALUES ($1,$2,$3)', [id, provider, categoryId]);
    }
    console.log('berhasil add provider');
  }

  async addProvider(provider) {
    const id = `provider-${this._idGenerator(5)}`;
    const query = {
      text: 'INSERT INTO providers VALUES($1, $2) RETURNING id ,provider',
      values: [id, provider],
    };
  }

  async getCategoryIdByName(category) {
    // console.log('get category id', category);
    const query = {
      text: 'SELECT id FROM category WHERE category = $1',
      values: [category],
    };
    try {
      const { rows } = await this._pool.query(query);
      // console.log('Gethasil', rows[0]);
      return rows[0].id;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getProviderIdByName(provider) {
    const query = {
      text: 'SELECT id FROM providers WHERE provider = $1',
      values: [provider],
    };
    try {
      const { rows } = await this._pool.query(query);
      return rows[0].id;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async getAllSku() {
    const query = {
      text: 'SELECT buyer_sku_code FROM products',
    };
    const { rows } = await this._pool.query(query);
    return rows.map((row) => row.buyer_sku_code);
  }

  async bulkInsertProducts(productLengkap) {
    console.log('masuk bulk insert product >', productLengkap);
    try {
      await this._pool.query('BEGIN');
      const value = await Promise.all(productLengkap.map(async (product) => {
        const generatedId = this._idGenerator(5);
        const categoryId = await this.getCategoryIdByName(product.category);
        const providerId = await this.getProviderIdByName(product.brand);
        // console.log('ini category berhasil');
        const stock = Number(product.stock);
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(stock)) {
          throw new Error(`Invalid stock value for product: ${product.product_name}`);
        }
        // console.log('ini product');
        // // console.log('ini adalah hasil product olahan =>>>>>>>>>>> ', [generatedId, categoryId, product.category]);
        return [generatedId, product.product_name, categoryId, providerId, product.type, product.seller_name, product.price, product.buyer_sku_code, product.buyer_product_status, product.seller_product_status, product.unlimited_stock, stock, product.multi, product.start_cut_off, product.end_cut_off, product.desc];
      }));

      // console.log('ini test', value);

      const cmd = `INSERT INTO products (id, product_name, category_id, provider_id, type, seller_name, price, buyer_sku_code, buyer_product_status, seller_product_status, unlimited_stock, stock, multi, start_cut_off, end_cut_off, "desc") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`;

      value.forEach(async (val) => {
        // console.log('ini val', val);
        try {
          await this._pool.query(cmd, val);
        } catch (err) {
          // console.error('error nih >>>>>', err);
        }
      });

      // console.log('ini result');
      // console.log('Bulk insert success:');

      await this._pool.query('COMMIT');
    } catch (err) {
      await this._pool.query('ROLLBACK');
      // console.error('Error inserting products:', err);
    }
  }
}

module.exports = ProductsRepositoryPostgres;
