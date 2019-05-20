const db = require('..')

module.exports = {

    find: (database, id) => {

        const query = db(`${database}`)

        return id ?
            query.where({ id }).select('id', 'username').first()
            :
            query

    },

    add: (database, user) => {

        return db(`${database}`).insert(user)

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
    }

}
