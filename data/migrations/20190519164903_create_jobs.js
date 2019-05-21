
exports.up = function (knex, Promise) {
    return knex.schema.createTable('jobs', col => {

        col.increments()

        col
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

        col.string('job_title')

        col.string('location')

        col.text('requirements')

        col
            .integer('niche')
            .references('id')
            .inTable('niches')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

        col
            .boolean('seen')
            .notNullable()

        col
            .timestamp('timestamp')
            .unique()

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('jobs')
};
