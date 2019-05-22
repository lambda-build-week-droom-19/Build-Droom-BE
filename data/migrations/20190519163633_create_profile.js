
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

        col.string('first_name')

        col.string('last_name')

        col.string('position')

        col.string('location')

        col.text('bio')

        col.string('job_type')

        col.string('contact_info')

        col.string('interests')

        col.text('past_experience')

        col.string('education')

        col.string('skills')

        col.string('references')

        col.string('social_media')

        col.string('portfolio')

        col.string('resume')

        col.string('projects')

        col
            .integer('niche')
            .references('id')
            .inTable('niches')
            .onUpdate('CASCADE')
            .onDelete('RESTRICT')

        col
            .boolean('seen')
            .notNullable()

        col.string('timestamp')

    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('profile')
};
