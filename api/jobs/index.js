const router = require('express').Router()
const auth = require('../auth/auth-middleware/auth')
const Jobs = require('../../data/actions')
const getMatches = require('./middleware').getMatches

const parseJob = require('./middleware').parseJob
const stringifyJob = require('./middleware').stringifyJob

router.get('/', async (req, res) => {

    try {

        let getJobs = await Jobs.find('jobs')

        getJobs = getJobs.map(job => parseJob(job))

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

        let getJob = await Jobs.find('jobs', id)

        getJob = parseJob(getJob, id)

        res.status(200).json(getJob)

    } catch (err) {

        console.log(err)

        res.status(500).json({ error: 'Internal Server Error', err })

    }

})

//////////////////
router.get('/:company_id/company-matches', auth, async (req, res) => {

    const { company_id } = req.params

    const { id } = req.decoded

    if (Number(company_id) === Number(id)) {

        try {

            const jobList = await Jobs.findCompanyJobs(company_id)

            await jobList.map(job => {
                getMatches(job.id)
                    .then(response => {
                        res.status(200).json(response)
                    })
                    .catch(err => {
                        throw new Error(err)
                    })
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

            error: 'You are not authorized to view these company matches.'

        })

    }

})


router.get('/employer/:id', async (req, res) => {

    const { id } = req.params

    try {

        let getEmployerJobs = await Jobs.findCompanyJobs(id)

        getEmployerJobs = getEmployerJobs.map(gej => parseJob(gej))

        res.status(200).json(getEmployerJobs)

    } catch (err) {

        console.log(err)

        res.status(200).json({
            error: 'Internal Server Error',
            err
        })

    }

})

//////////////////

router.post('/', auth, async (req, res) => {

    let { body } = req

    let { id } = req.decoded

    id = Number(id)

    if (body) {

        try {

            const addJob = await Jobs.add('jobs', stringifyJob(body, id))

            let newJob = await Jobs.find('jobs', addJob[0])

            res.status(200).json(parseJob(newJob))

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

    if (Number(id) === Number(subject)) {

        try {

            const jobby = await Jobs.updateJob(id, stringifyJob(body))

            const updateJob = jobby ?
                await Jobs.find('jobs', id)
                :
                {
                    error: 'Could not update job.'
                }

            console.log('updateJob', updateJob)

            res.status(200).json(parseJob(updateJob))

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

router.delete('/:id', auth, async (req, res) => {

    const { id } = req.params

    const job = await Jobs.find('jobs', id)

    console.log(req.decoded.id, job.user_id)

    if (req.decoded.id === job.user_id) {

        try {

            await Jobs.remove('jobs', id)

            res.status(200).json({
                message: "Has been deleted."
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
            error: 'You are not authorized to delete this job.'
        })

    }

})

module.exports = router
