const router = require('express').Router()
const auth = require('../auth/auth-middleware/auth')
const Profiles = require('../../data/actions')

const parseSeeker = require('./middleware/index').parseSeeker
const parseEmployer = require('./middleware').parseEmployer
const stringifySeeker = require('./middleware').stringifySeeker
const stringifyEmployer = require('./middleware').stringifyEmployer

router.get('/:db', auth, async (req, res) => {

    let { db } = req.params

    const { id, user_type } = req.decoded

    try {

        switch (db) {
            case 'seekers':
                db = 'profile'
                const getSeekers = await Profiles.find(db)

                res.status(200).json(getSeekers.map(seeker => parseSeeker(seeker)))
                break
            case 'seeker':
                db = 'profile'

                if (user_type === 0) {

                    const seeker_id = req.headers.id

                    const getSeeker = await Profiles.seek(db, seeker_id)

                    res.status(200).json(parseSeeker(getSeeker))
                    break
                }

                const getSeeker = await Profiles.seek(db, id)

                res.status(200).json(parseSeeker(getSeeker))
                break
            case 'employers':
                db = 'emprofiles'
                const getEmployers = await Profiles.find(db)

                const emps = getEmployers.map(emp => parseEmployer(emp))

                res.status(200).json(emps)
                break
            case 'employer':
                db = 'emprofiles'
                if (user_type === 1) {

                    const employer_id = req.headers.id

                    const getEmployer = await Profiles.seek(db, employer_id)

                    res.status(200).json(parseEmployer(getEmployer))

                }

                const getEmployer = await Profiles.seek('emprofiles', id)

                res.status(200).json(parseEmployer(getEmployer))
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

    let { body } = req

    let { db } = req.params

    const { id, user_type } = req.decoded

    try {

        switch (db) {

            case 'seeker':
                if (user_type === 1) {

                    db = 'profile'

                    await Profiles.add(db, stringifySeeker(body, id))

                    const profile = await Profiles.seek(db, id)

                    res.status(200).json(profile)

                } else {

                    res.status(401).json({
                        error: 'You are not a job seeker'
                    })

                }
                break
            case 'employer':
                if (user_type === 0) {

                    db = 'emprofiles'

                    await Profiles.add(db, stringifyEmployer(body, id))

                    const emp = await Profiles.seek(db, id)

                    res.status(200).json(parseEmployer(emp))

                } else {

                    res.status(401).json({
                        error: 'You are not an employer.'
                    })

                }
                break
            default:
                res.status(400).json({
                    error: `Cannot POST /profiles/${db}. Please try again.`
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

    const { id } = req.decoded

    let { body } = req

    if (id) {

        try {

            switch (db) {
                case 'seeker':

                    const updatedSeeker = await Profiles.update('profile', id, stringifySeeker(body))

                    res.status(200).json(parseSeeker(updatedSeeker))
                    break
                case 'employer':
                    const updateJob = await Profiles.update('emprofiles', id, stringifyEmployer(body))

                    res.status(200).json(parseEmployer(updateJob))
                    break
                default:
                    res.status(404).json({
                        error: `Cannot PUT /profile/${db}. Please try again.`
                    })
            }

        } catch (err) {

            console.log(err)

            res.status(500).json({
                error: 'Internal Server Error',
                err
            })

        }

    } else {
        res.status(401).json({
            error: 'You are not authorized to edit this profile.'
        })
    }


})

router.delete('/:db', auth, async (req, res) => {

    let { db } = req.params

    const { id } = req.decoded

    const getProfile = await Profiles.find(db, id)

    if (id === getProfile.user_id) {

        try {

            db = db === 'employer' ? 'emprofiles' : 'profile'

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

    } else {

        res.status(401).json({
            error: 'You are not authorized to delete this profile.'
        })

    }


})

module.exports = router
