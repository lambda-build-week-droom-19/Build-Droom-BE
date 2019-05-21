
exports.up = function (knex, Promise) {
    return knex.schema.createTable('profile', col => {

        col.increments()

        col
            .integer('user_id')
            .notNullable()
            .unique()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

        col
            .string('first_name')
            .notNullable()

        col
            .string('last_name')
            .notNullable()

        col.string('location')

        col.text('bio')

        col.text('past_experience')

        col.string('interests')

        col
            .integer('niche')
            .references('id')
            .inTable('niches')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

        col
            .boolean('seen')
            .notNullable()

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('profile')
};
