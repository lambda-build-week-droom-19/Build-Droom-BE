
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

        col.boolean('pay_type')

        col.string('starting_pay')

        col.string('description')

        col.string('responsibilites')

        col.string('required_skills')

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

        col
            .string('appliers')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')


        col
            .string('confirmed')
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('jobs')
};
