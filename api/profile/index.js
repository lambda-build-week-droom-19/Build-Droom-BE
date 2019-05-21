const router = require('express').Router()
const auth = require('../auth/auth-middleware/auth')
const Profiles = require('../../data/actions')

router.get('/:db', auth, async (req, res) => {

    let { db } = req.params

    const { id } = req.headers

    try {

        switch (db) {
            case 'seekers':
                db = 'profile'
                const getSeekers = await Profiles.find(db)

                res.status(200).json(getSeekers)
                break
            case 'seeker':
                db = 'profile'
                const getSeeker = await Profiles.seek(id)

                res.status(200).json({
                    ...getSeeker,
                    seen: getSeeker.seen === 1 ? true : false
                })
                break
            case 'jobs':
                db = 'jobs'
                const getJobs = await Profiles.find(db)

                res.status(200).json(getJobs)
                break
            case 'job':
                db = 'jobs'
                const getEmployer = await Profiles.find('jobs', id)

                res.status(200).json({
                    ...getEmployer,
                    seen: getEmployer.seen === 1 ? true : false
                })
                break
            default:
                res.status(400).json({
                    error: `/profile/${db} is not a valid endpoint. Please try again.`
                })

        }

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }


})

router.post('/:db', auth, async (req, res) => {

    const { body } = req

    let { db } = req.params

    const { id } = req.headers

    try {

        switch (db) {

            case 'seeker':
                db = 'profile'
                body['seeker_id'] = id

                const addProfile = await Profiles.add(db, body)

                res.status(200).json(addProfile)
                break
            case 'employer':
                db = 'jobs'
                body['employer_id'] = id

                const addJob = await Profiles.add(db, body)

                res.status(200).json(addJob)
                break
            default:
                res.status(400).json({
                    error: `/profiles/${db} is not a valid endpoint. Please try again.`
                })
        }

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }

})

router.put('/:db', auth, async (req, res) => {

    const { db } = req.params

    const { id } = req.headers

    const { body } = req

    try {

        switch (db) {
            case 'seeker':
                const updateSeeker = await Profiles.update('profile', id, body)

                res.status(200).json(updateSeeker)
                break
            case 'job':
                const updateJob = await Profiles.update('jobs', id, body)

                res.status(200).json(updateJob)
                break
            default:
                res.status(404).json({
                    error: `/profile/${db} is not a valid endpoint. Please try again.`
                })
        }

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }

})

router.delete('/:db', auth, async (req, res) => {

    let { db } = req.params

    const { id } = req.headers

    try {

        db = db === 'job' ? 'jobs' : 'profile'

        const del = await Profiles.remove(db, id)

        del ?
            res.status(200).json({ message: 'Has been deleted.' })
            :
            res.status(404).json({ error: 'Does not exist.' })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }

})

module.exports = router
