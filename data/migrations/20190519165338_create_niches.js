
exports.up = function (knex, Promise) {
    return knex.schema.createTable('niches', col => {

        col.increments()

        col
            .string('niche')
            .notNullable()
            .unique()

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('niches')
};
