const router = require('express').Router()
const auth = require('../auth/auth-middleware/auth')
const Profiles = require('../../data/actions')

router.get('/:db', auth, async (req, res) => {

    let { db } = req.params

    const { id } = req.headers

    switch (db) {
        case 'seekers':
            db = 'profile'
            try {

                const get = await Profiles.find(db)

                res.status(200).json(get)

            } catch (err) {

                console.log(err)

                res.status(500).json({
                    error: 'Internal Server Error',
                    err
                })

            }
        case 'employers':
            db = 'jobs'
            try {

                const get = await Profiles.find(db)

                res.status(200).json(get)

            } catch (err) {

                console.log(err)

                res.status(500).json({
                    error: 'Internal Server Error',
                    err
                })

            }
        case 'employer':
            db = 'jobs'
            try {

                const getJobs = await Profiles.findEmp(id)

                res.status(200).json(getJobs)

            } catch (err) {

                console.log(err)

                res.status(500).json({
                    error: 'Internal Server Error',
                    err
                })

            }
        case 'seeker':
            db = 'profile'
            try {

                const getSeeker = await Profiles.seek(id)

                res.status(200).json(getSeeker)

            } catch (err) {

                console.log(err)

                res.status(500).json({
                    error: 'Internal Server Error',
                    err
                })

            }
        default:
            res.status(400).json({
                error: `/profile/${db} is not a valid endpoint. Please try again.`
            })

    }

})

module.exports = router
