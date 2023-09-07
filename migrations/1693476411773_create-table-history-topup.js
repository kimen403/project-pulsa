/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('history_topup', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    id_user: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    nominal: {
      type: 'INT',
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
    updated_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('history_topup');
};
