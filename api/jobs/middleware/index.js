const Jobs = require('../../../data/actions')

module.exports = async (id) => {

    try {

        const getJob = await Jobs.find('jobs', id);
        console.log("getJob", getJob)
        let availableUsers = JSON.parse(getJob.appliers);
        let confirmedUsers = JSON.parse(getJob.confirmed);
        console.log("availableUsers", availableUsers)
        console.log("confirmedUsers", confirmedUsers)

        const getUsers = await Jobs.find("profile")
        console.log("getUsers", getUsers)

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

        console.log("usersAvailable", usersAvailable)

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

        console.log("usersConfirmed", usersConfirmed)

        let jobMatchList = {
            job: {
                title: getJob.job_title,
                id: getJob.user_id
            },
            usersAvailable: usersAvailable,
            usersConfirmed: usersConfirmed,
            something: 'Something'
        }

        console.log("jobMatchList", jobMatchList)

        return Promise.jobMatchList

    } catch (err) {

        console.log(err)

    }


}