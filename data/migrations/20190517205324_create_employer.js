
exports.up = function (knex, Promise) {
    return knex.schema.createTable('employer', col => {

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
    return knex.schema.dropTableIfExists('employer')
};
