
exports.up = function (knex, Promise) {
    return knex.schema.createTable('emprofiles', col => {

        col.increments()

        col
            .string('name')
            .unique()
            .notNullable()

        col
            .integer('employer_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

        col.string('about')

        col.string('contact_info')

        col.string('social_media')

        col.string('website')

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('emprofiles')
};
