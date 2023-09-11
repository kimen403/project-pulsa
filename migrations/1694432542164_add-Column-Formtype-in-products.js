/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('products', {
    form_type: {
      type: 'varchar(100)',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('products', ['form_type']);
};
