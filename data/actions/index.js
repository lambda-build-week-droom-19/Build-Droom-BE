const db = require('..')

module.exports = {

    find: (database, id) => {

        const query = db(`${database}`)

        return id &&
            query.where({ id }).select('id', 'username').first()

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
    }

}
