/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('products', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    product_name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    category_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    provider_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    type: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    seller_name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    price: {
      type: 'INTEGER',
      notNull: true,
    },
    buyer_sku_code: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    buyer_product_status: {
      type: 'BOOLEAN',
      notNull: true,
    },
    seller_product_status: {
      type: 'BOOLEAN',
      notNull: true,
    },
    unlimited_stock: {
      type: 'BOOLEAN',
      notNull: true,
    },
    stock: {
      type: 'INTEGER',
      notNull: true,
    },
    multi: {
      type: 'BOOLEAN',
      notNull: true,
    },
    start_cut_off: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    end_cut_off: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    desc: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('products');
};
