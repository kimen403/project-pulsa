/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint(
    'products',
    'fk_products.provider_id_providers.id',
    'FOREIGN KEY(provider_id) REFERENCES providers(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'products',
    'fk_products.category_id_categories.id',
    'FOREIGN KEY(category_id) REFERENCES category(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('products', 'fk_products.provider_id_providers.id');
  pgm.dropConstraint('products', 'fk_products.category_id_categories.id');
};
