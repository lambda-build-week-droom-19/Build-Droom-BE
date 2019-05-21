const db = require('..')

module.exports = {

    find: (database, id) => {

        const query = db(`${database}`)

        return id ?
            query.where({ id }).first()
            :
            (database === 'employer' || database === 'seeker') ?
                query.select('id', 'username')
                :
                query

    },

    add: (database, info) => {

        return db(`${database}`).insert(info)

    },

    update: async (database, id, changes) => {

        if (database === 'profile') {

            await db(`${database}`)
                .where({ seeker_id: id })
                .first()
                .update(changes)

            return db(`${database}`)
                .where({ seeker_id: id })
                .first()

        }

        await db(`${database}`)
            .where({ id })
            .first()
            .update(changes)

        return db(`${database}`)
            .where({ id })
            .first()

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
        return db('emprofiles').where({ employer_id }).first()
    },

    seek: (seeker_id) => {
        return db('profile').where({ seeker_id }).first()
    },

    findEmpWithNiche: (id) => {
        return db('jobs').where({ 'niche': `${id}` }).map(job => {
            return {
                ...job,
                seen: job.seen === 1 ? true : false
            }
        })
    },

    findSeekWithNiche: (id) => {
        return db('profile').where({ 'niche': `${id}` }).map(profile => {
            return {
                ...profile,
                seen: profile.seen === 1 ? true : false
            }
        })
    },

}
