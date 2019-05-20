const db = require('..')

module.exports = {

    find: (database, id) => {

        const query = db(`${database}`)

        return id ?
            query.where({ id }).select('id', 'username').first()
            :
            (database === 'employer' || database === 'seeker') ?
                query.select('id', 'username')
                :
                query

    },

    add: (database, info) => {

        return db(`${database}`).insert(info)

    },

    update: (database, id, changes) => {

        return db(`${database}`)
            .where({ id })
            .update(changes)

    },

    remove: (database, id) => {

        return db(`${database}`)
            .where({ id })
            .del()

    },

    findByUsername: (database, username) => {
        return db(`${database}`).where({ username }).first()
    },

    findEmp: (employer_id) => {
        return db('jobs').where({ employer_id }).first()
    },

    seek: (seeker_id) => {
        return db('profile').where({ seeker_id }).first()
    },

    findEmpWithNiche: (id) => {
        return db('jobs').where({ 'niche': `${id}` })
    },

    findSeekWithNiche: (id) => {
        return db('profile').where({ 'niche': `${id}` })
    },

}
