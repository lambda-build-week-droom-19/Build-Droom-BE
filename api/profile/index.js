const router = require('express').Router()
const auth = require('../auth/auth-middleware/auth')
const Profiles = require('../../data/actions')

router.get('/:db', auth, async (req, res) => {

    let { db } = req.params

    const { id, user_type } = req.decoded

    try {

        switch (db) {
            case 'seekers':
                db = 'profile'
                const getSeekers = await Profiles.find(db)

                res.status(200).json(getSeekers.map(seeker => {
                    const { contact_info, interests, past_experience, education, skills, references, social_media, projects, seen } = seeker
                    return {
                        ...seeker,
                        contact_info: contact_info && JSON.parse(contact_info),
                        interests: interests && JSON.parse(interests),
                        education: education && JSON.parse(education),
                        skills: skills && JSON.parse(skills),
                        references: references && JSON.parse(references),
                        social_media: social_media && JSON.parse(social_media),
                        projects: projects && JSON.parse(projects),
                        past_experience: past_experience && JSON.parse(past_experience),
                        seen: seen === 1
                    }
                }))
                break
            case 'seeker':
                db = 'profile'
                const getSeeker = await Profiles.seek(db, id)

                res.status(200).json({
                    ...getSeeker,
                    contact_info: getSeeker.contact_info && JSON.parse(getSeeker.contact_info),
                    interests: getSeeker.interests && JSON.parse(getSeeker.interests),
                    past_experience: getSeeker.past_experience && JSON.parse(getSeeker.past_experience),
                    education: getSeeker.education && JSON.parse(getSeeker.education),
                    skills: getSeeker.skills && JSON.parse(getSeeker.skills),
                    references: getSeeker.references && JSON.parse(getSeeker.references),
                    social_media: getSeeker.social_media && JSON.parse(getSeeker.social_media),
                    projects: getSeeker.projects && JSON.parse(getSeeker.projects),
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
                    const { contact_info, interests, past_experience, education, skills, references, social_media, projects, seen } = body
                    body = {
                        ...body,
                        contact_info: contact_info && JSON.stringify(contact_info),
                        interests: interests && JSON.stringify(interests),
                        past_experience: past_experience && JSON.stringify(past_experience),
                        education: education && JSON.stringify(education),
                        skills: skills && JSON.stringify(skills),
                        references: references && JSON.stringify(references),
                        social_media: social_media && JSON.stringify(social_media),
                        projects: projects && JSON.stringify(projects),
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

    const { id } = req.decoded

    let { body } = req

    if (id) {

        try {

            switch (db) {
                case 'seeker':
                    const { contact_info, interests, past_experience, education, skills, references, social_media, projects, seen } = body
                    body = {
                        ...body,
                        contact_info: contact_info && JSON.stringify(contact_info),
                        interests: interests && JSON.stringify(interests),
                        past_experience: past_experience && JSON.stringify(past_experience),
                        education: education && JSON.stringify(education),
                        skills: skills && JSON.stringify(skills),
                        references: references && JSON.stringify(references),
                        social_media: social_media && JSON.stringify(social_media),
                        projects: projects && JSON.stringify(projects),
                        seen: seen === 1
                    }

                    const updatedSeeker = await Profiles.update('profile', id, body)

                    res.status(200).json({
                        ...updatedSeeker,
                        contact_info: updatedSeeker.contact_info && JSON.parse(updatedSeeker.contact_info),
                        interests: updatedSeeker.interests && JSON.parse(updatedSeeker.interests),
                        past_experience: updatedSeeker.past_experience && JSON.parse(updatedSeeker.past_experience),
                        education: updatedSeeker.education && JSON.parse(updatedSeeker.education),
                        skills: updatedSeeker.skills && JSON.parse(updatedSeeker.skills),
                        references: updatedSeeker.references && JSON.parse(updatedSeeker.references),
                        social_media: updatedSeeker.social_media && JSON.parse(updatedSeeker.social_media),
                        projects: updatedSeeker.projects && JSON.parse(updatedSeeker.projects),
                        seen: updatedSeeker.seen === 1
                    })
                    break
                case 'employer':
                    body = {
                        ...body,
                        user_id: id,
                        contact_info: body.contact_info && JSON.stringify(body.contact_info),
                        social_media: body.social_media && JSON.stringify(body.social_media)
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

    } else {

        res.status(401).json({
            error: 'You are not authorized to delete this profile.'
        })

    }


})

module.exports = router
