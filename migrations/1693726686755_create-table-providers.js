/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('providers', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    category_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    provider: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    image: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    banner: {
      type: 'JSONB',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('providers');
};
