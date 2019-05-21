const router = require('express').Router()
const auth = require('../auth/auth-middleware/auth')
const Jobs = require('../../data/actions')

router.get('/', auth, async (req, res) => {

    try {

        const getJobs = await Profiles.find('jobs')

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

        const getJobs = await Profiles.find('jobs', id)

        res.status(200).json(getJobs)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }

})

router.post('/', auth, async (req, res) => {

    const { body } = req

    if (body.name) {

        try {

            const newJob = await Jobs.add('emprofiles', body)

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

module.exports = router
