
exports.up = function (knex, Promise) {
    return knex.schema.createTable('seeker', col => {

        col.increments()

        col
            .string('username')
            .notNullable()
            .unique()

        col
            .string('password')
            .notNullable()
            .unique()

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('seeker')
};
