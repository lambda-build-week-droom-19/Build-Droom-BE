const router = require('express').Router()
const auth = require('../auth/auth-middleware/auth')
const Jobs = require('../../data/actions')

router.get('/', auth, async (req, res) => {

    try {

        const getJobs = await Jobs.find('jobs')

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

        const getJobs = await Jobs.find('jobs', id)

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

    let { body } = req

    if (body.user_id) {

        body = {
            ...body,
            seen: false
        }

        try {

            const addJob = await Jobs.add('jobs', body)

            const newJob = await Jobs.find('jobs', addJob[0])

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
