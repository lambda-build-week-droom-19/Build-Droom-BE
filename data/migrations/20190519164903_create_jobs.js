
exports.up = function (knex, Promise) {
    return knex.schema.createTable('jobs', col => {

        col
            .integer('employer_id')
            .notNullable()
            .references('id')
            .inTable('employer')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

        col
            .string('job_title')
            .notNullable()

        col
            .string('location')
            .notNullable()

        col
            .text('requirements')
            .notNullable()

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
    return knex.schema.dropTableIfExists('jobs')
};
