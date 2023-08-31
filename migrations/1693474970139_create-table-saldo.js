/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('saldo', {
        id_user: {
            type: 'VARCHAR(50)',
            primaryKey: true,
            notNull: true,
        },
        saldo: {
            type: 'NUMERIC',
            notNull: true,
            default: 0,
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('saldo');
};
