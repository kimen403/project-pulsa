/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns(
    'users',
    {
      saldo: {
        type: 'integer',
        notNull: true,
        default: 0,
      },

    },
    pgm.addColumns('users', {
      role: {
        type: 'varchar(10)',
        notNull: true,
        default: 'USER',
      },
    }),
  );
};

exports.down = (pgm) => {
  pgm.dropColumns('users', 'saldo');
  pgm.dropColumns('users', 'role');
};
