const router = require('express').Router()
const auth = require('../auth/auth-middleware/auth')
const Jobs = require('../../data/actions')
const getMatches = require('./middleware')
router.get('/', async (req, res) => {

    try {

        let getJobs = await Jobs.find('jobs')

        getJobs = getJobs.map(job => {

            const { responsibilites, required_skills, appliers, confirmed, seen } = job

            return {
                ...job,
                responsibilites: responsibilites && JSON.parse(responsibilites),
                required_skills: required_skills && JSON.parse(required_skills),
                appliers: appliers && JSON.parse(appliers),
                confirmed: confirmed && JSON.parse(confirmed),
                seen: seen === 1
            }
        })

        res.status(200).json(getJobs)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }

})

router.get('/:id', async (req, res) => {

    const { id } = req.params

    try {

        const getJob = await Jobs.find('jobs', id)

        const { responsibilites, required_skills, appliers, confirmed, seen } = getJob

        res.status(200).json({
            ...getJob,
            responsibilites: responsibilites && JSON.parse(responsibilites),
            required_skills: required_skills && JSON.parse(required_skills),
            appliers: appliers && JSON.parse(appliers),
            confirmed: confirmed && JSON.parse(confirmed),
            seen: seen === 1
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({ error: 'Internal Server Error', err })

    }

})

//////////////////
router.get('/:company_id/company-matches', async (req, res) => {

    const { company_id } = req.params

    try {

        const jobList = await Jobs.findCompanyJobs(company_id)

        const matchList = jobList.map(async job => {
            return await getMatches(job.id)
        })

        res.status(200).json(matchList)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            ...getJob,
            requirements: JSON.parse(getJob.requirements),
            seen: body.seen === 1
        })

    }
})
//////////////////

router.post('/', auth, async (req, res) => {

    let { body } = req

    const id = req.decoded.subject

    if (body) {

        const { responsibilites, required_skills, appliers, confirmed, seen } = body

        body = {
            ...body,
            responsibilites: responsibilites && JSON.stringify(responsibilites),
            required_skills: required_skills && JSON.stringify(required_skills),
            appliers: appliers && JSON.stringify(appliers),
            confirmed: confirmed && JSON.stringify(confirmed),
            seen: seen === 1
        }

        try {

            const addJob = await Jobs.add('jobs', body)

            let newJob = await Jobs.find('jobs', addJob[0])

            newJob = {
                ...newJob,
                responsibilites: newJob.responsibilites && JSON.parse(newJob.responsibilites),
                required_skills: newJob.required_skills && JSON.parse(newJob.required_skills),
                appliers: newJob.appliers && JSON.parse(newJob.appliers),
                confirmed: newJob.confirmed && JSON.parse(newJob.confirmed),
                seen: seen === 1
            }

            res.status(200).json(newJob)

        } catch (err) {

            console.log(err)

            res.status(500).json({
                error: 'Internal Server Error',
                err
            })

        }

    }

})

router.put('/:id', auth, async (req, res) => {

    const { id } = req.params

    let { body } = req

    const subject = req.decoded.id

    if (id == subject) {

        try {

            await Jobs.update('jobs', body)

            const updateJob = await Jobs.find('job', id)

            res.status(200).json({
                ...updateJob,
                responsibilites: updateJob.responsibilites && JSON.parse(updateJob.responsibilites),
                required_skills: updateJob.required_skills && JSON.parse(updateJob.required_skills),
                appliers: updateJob.appliers && JSON.parse(updateJob.appliers),
                confirmed: updateJob.confirmed && JSON.parse(updateJob.confirmed),
                seen: updateJob.seen === 1
            })

        } catch (err) {

            console.log(err)

            res.status(500).json({
                error: 'Internal Server Error',
                err
            })

        }

    } else {

        res.status(401).json({
            error: 'You are not authorized to edit this job.'
        })

    }

})

module.exports = router
