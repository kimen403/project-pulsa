/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.renameColumn('products', 'price', 'base_price');
  pgm.addColumns('products', {
    v1_price: {
      type: 'integer',
      default: 0,
      notNull: true,
    },
    v2_price: {
      type: 'integer',
      default: 0,
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('products', ['base_price', 'v1_price', 'v2_price']);
  pgm.renameColumn('products', 'base_price', 'price');
};
