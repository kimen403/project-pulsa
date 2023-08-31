/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('history_topup', {
        id_history_topup: {
            type: 'VARCHAR(50)',
            primaryKey: true,
            notNull: true,
        },
        id_user: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        nominal_topup: {
            type: 'NUMERIC',
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

exports.down = pgm => {
    pgm.dropTable('history_topup');
    
};
