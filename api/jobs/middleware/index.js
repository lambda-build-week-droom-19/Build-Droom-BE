const Jobs = require('../../../data/actions')

module.exports = async (id) => {

    try {

        const getJob = await Jobs.find('jobs', id);
        let availableUsers = JSON.parse(getJob.appliers);
        let confirmedUsers = JSON.parse(getJob.confirmed);

        const getUsers = await Jobs.find("profile")

        usersAvailable = getUsers.filter(user => {
            const match = availableUsers && availableUsers.filter(id => id === user.user_id)[0]
            if (user.user_id === match) {
                return user
            }
        }).map(user => {
            return {
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
                position: user.position,
                location: user.location
            }
        })

        usersConfirmed = getUsers.filter(user => {
            const match = confirmedUsers && confirmedUsers.filter(id => id === user.user_id)[0]
            if (user.user_id === match) {
                return user
            }
        }).map(user => {
            return {
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
                position: user.position,
                location: user.location
            }
        })

        let jobMatchList = {
            job: {
                title: getJob.job_title,
                id: getJob.user_id
            },
            usersAvailable: usersAvailable,
            usersConfirmed: usersConfirmed,
            something: 'Something'
        }

        return Promise.resolve(jobMatchList)

    } catch (err) {

        console.log(err)

    }


}