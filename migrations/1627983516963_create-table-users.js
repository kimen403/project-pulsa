/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('users', {
    id_user: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    fullname: {
      type: 'TEXT',
      notNull: true,
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    no_wa: {
      type: 'NUMERIC(13)',
      notNull: true,
      unique: true,
    },
    email: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    pin_keamanan: {
      type: 'NUMERIC(6)',
      notNull: true,
    },
    kode_referal: {
      type: 'VARCHAR(50)',
      notNull: true,
      default: '0',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
