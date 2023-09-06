/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('transaksi', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    id_user: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    sku: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    customer_ref: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    status: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('transaksi');
};
