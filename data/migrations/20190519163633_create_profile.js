
exports.up = function (knex, Promise) {
    return knex.schema.createTable('profile', col => {

        col
            .integer('seeker_id')
            .unique()
            .notNullable()
            .references('id')
            .inTable('seeker')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

        col
            .string('first_name')
            .notNullable()

        col
            .string('last_name')
            .notNullable()

        col
            .string('location')
            .notNullable()

        col
            .text('bio')
            .notNullable()

        col.text('past_experience')

        col.string('interests')

        col
            .integer('niche')
            .notNullable()
            .references('id')
            .inTable('niches')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('profile')
};
