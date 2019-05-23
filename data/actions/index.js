const db = require('..')

// const Users = require(this folder)

// try {

//     const arrayOfUserIds = [1,2,3]

//     let users = await Users.find('profile')

//     users = users.filter(user => {
//         if (arrayOfUserIds.filter(id => id === user.user_id)) {
//             return user
//         }
//     })

//     res.status(200).json(users)

// }

module.exports = {

    find: (database, id) => {

        const query = db(`${database}`)

        return id ?
            query.where({ id }).first()
            :
            query

    },

    add: (database, info) => {

        return db(`${database}`).insert(info)

    },

    update: async (database, user_id, changes) => {

        await db(`${database}`)
            .where({ user_id })
            .first()
            .update(changes)

        return db(`${database}`)
            .where({ user_id })
            .first()

    },

    updateJob: async (id, changes) => {

        await db('jobs')
            .where({ id })
            .first()
            .update(changes)

        return db('jobs')
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

    seek: (database, user_id) => {
        return db(`${database}`).where({ user_id }).first()
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

    findCompanyJobs: (user_id) => {
        return db('jobs').where({ user_id })
    }

}
