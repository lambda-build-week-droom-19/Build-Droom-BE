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
                const getSeeker = await Profiles.seek(db, id)

                res.status(200).json({
                    ...getSeeker,
                    past_experience: JSON.parse(getSeeker.past_experience),
                    interests: JSON.parse(getSeeker.interests),
                    seen: getSeeker.seen === 1
                })
                break
            case 'employers':
                db = 'emprofiles'
                const getEmployers = await Profiles.find(db)

                const emps = getEmployers.map(emp => {
                    return {
                        ...emp,
                        contact_info: emp.contact_info && JSON.parse(emp.contact_info),
                        social_media: emp.social_media && JSON.parse(emp.social_media)
                    }
                })

                res.status(200).json(emps)
                break
            case 'employer':
                db = 'emprofiles'
                const getEmployer = await Profiles.seek('emprofiles', id)

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
                    past_experience: past_experience && JSON.stringify(past_experience),
                    interests: interests && JSON.stringify(interests),
                    seen: seen === 1
                }

                await Profiles.add(db, body)

                const profile = await Profiles.seek(db, id)

                res.status(200).json(profile)
                break
            case 'employer':
                db = 'emprofiles'
                const { contact_info, social_media } = body
                body = {
                    ...body,
                    employer_id: id,
                    contact_info: contact_info && JSON.stringify(contact_info),
                    social_media: social_media && JSON.stringify(social_media)
                }

                await Profiles.add(db, body)

                const emp = await Profiles.seek(db, id)

                res.status(200).json(emp)
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

    let { body } = req

    try {

        switch (db) {
            case 'seeker':
                const { past_experience, interests, seen } = body
                body = {
                    ...body,
                    seeker_id: id,
                    past_experience: past_experience && JSON.stringify(past_experience),
                    interests: interests && JSON.stringify(interests),
                    seen: seen === 1
                }

                const updatedSeeker = await Profiles.update('profile', id, body)

                res.status(200).json(updatedSeeker)
                break
            case 'employer':
                const { contact_info, social_media } = body
                body = {
                    ...body,
                    employer_id: id,
                    contact_info: contact_info && JSON.stringify(contact_info),
                    social_media: social_media && JSON.stringify(social_media)
                }
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
