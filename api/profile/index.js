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

    const { id, user_type } = req.decoded

    try {

        switch (db) {

            case 'seeker':
                if (user_type === 0) {

                    db = 'profile'
                    const { past_experience, interests, seen } = body
                    body = {
                        ...body,
                        user_id: id,
                        past_experience: past_experience && JSON.stringify(past_experience),
                        interests: interests && JSON.stringify(interests),
                        seen: seen === 1
                    }

                    await Profiles.add(db, body)

                    const profile = await Profiles.seek(db, id)

                    res.status(200).json(profile)

                } else {

                    res.status(401).json({
                        error: 'You are not a job seeker'
                    })

                }
                break
            case 'employer':
                if (user_type === 1) {

                    db = 'emprofiles'
                    const { contact_info, social_media } = body
                    body = {
                        ...body,
                        user_id: id,
                        contact_info: contact_info && JSON.stringify(contact_info),
                        social_media: social_media && JSON.stringify(social_media)
                    }

                    await Profiles.add(db, body)

                    const emp = await Profiles.seek(db, id)

                    res.status(200).json(emp)

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

    const id = req.decoded.subject

    let { body } = req

    console.log(req.decoded.subject, id)

    if (!id || req.decoded.subject == id) {

        try {

            switch (db) {
                case 'seeker':
                    const { past_experience, interests, seen } = body
                    body = {
                        ...body,
                        user_id: id,
                        past_experience: past_experience && JSON.stringify(past_experience),
                        interests: interests && JSON.stringify(interests),
                        seen: seen === 1
                    }

                    const updatedSeeker = await Profiles.update('profile', id, body)

                    res.status(200).json({
                        ...updatedSeeker,
                        user_id: id,
                        past_experience: updatedSeeker.past_experience && JSON.parse(updatedSeeker.past_experience),
                        interests: updatedSeeker.interests && JSON.parse(updatedSeeker.interests),
                        seen: seen === 1
                    })
                    break
                case 'employer':
                    const { contact_info, social_media } = body
                    body = {
                        ...body,
                        user_id: id,
                        contact_info: contact_info && JSON.stringify(contact_info),
                        social_media: social_media && JSON.stringify(social_media)
                    }
                    const updateJob = await Profiles.update('emprofiles', id, body)

                    res.status(200).json({
                        ...updateJob,
                        user_id: id,
                        contact_info: updateJob.contact_info && JSON.parse(updateJob.contact_info),
                        social_media: updateJob.social_media && JSON.parse(updateJob.social_media)
                    })
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

    const id = req.decoded.subject

    if (req.decoded.subject == id) {

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

    }


})

module.exports = router
