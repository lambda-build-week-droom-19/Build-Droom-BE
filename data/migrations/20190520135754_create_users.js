
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', col => {

        col.increments()

        col
            .string('username')
            .notNullable()
            .unique()

        col
            .string('password')
            .notNullable()
            .unique()

        col
            .integer('user_type')
            .notNullable()

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users')
};
