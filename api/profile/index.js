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

                res.status(200).json(getSeekers.map(seeker => {
                    const { past_experience, interests, seen } = seeker
                    return {
                        ...seeker,
                        past_experience: JSON.parse(past_experience),
                        interests: JSON.parse(interests),
                        seen: seen === 1
                    }
                }))
                break
            case 'seeker':
                db = 'profile'
                const getSeeker = await Profiles.seek(id)

                res.status(200).json({
                    ...getSeeker,
                    past_experience: JSON.parse(getSeeker.past_experience),
                    interests: JSON.parse(getSeeker.interests),
                    seen: getSeeker.seen === 1
                })
                break
            case 'employer':
                db = 'emprofiles'
                const getEmployer = await Profiles.findEmp(id)

                res.status(200).json({
                    ...getEmployer,
                    contact_info: JSON.parse(getEmployer.contact_info),
                    social_media: JSON.parse(getEmployer.social_media)
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

    let { body } = req

    let { db } = req.params

    const { id } = req.headers

    try {

        switch (db) {

            case 'seeker':
                db = 'profile'
                const { past_experience, interests, seen } = body
                body = {
                    ...body,
                    seeker_id: id,
                    past_experience: past_experience && JSON.parse(past_experience),
                    interests: interests && JSON.parse(interests),
                    seen: seen === 1
                }

                const addProfile = await Profiles.add(db, body)

                res.status(200).json(addProfile)
                break
            case 'employer':
                db = 'emprofiles'
                body['employer_id'] = id

                const addJob = await Profiles.add(db, body)

                res.status(200).json(addJob)
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

    const { id } = req.headers

    const { body } = req

    try {

        switch (db) {
            case 'seeker':
                const updateSeeker = await Profiles.update('profile', id, body)

                res.status(200).json(updateSeeker)
                break
            case 'job':
                const updateJob = await Profiles.update('emprofiles', id, body)

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

        db = db === 'employer' ? 'emprofile' : 'profile'

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
