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
    message: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    rc: {
      type: 'VARCHAR(5)',
      notNull: false,
    },
    cs_telegram: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    cs_wa: {
      type: 'VARCHAR(15)',
      notNull: false,
    },
    sn: {
      type: 'text',
      notNull: false,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('transaksi');
};
