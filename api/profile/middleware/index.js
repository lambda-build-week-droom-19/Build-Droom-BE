module.exports = {

    parseSeeker: seeker => {


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
            seen: seen && JSON.parse(seen)
        }

    },

    parseEmployer: employer => {

        const { contact_info, social_media } = employer

        return {
            ...employer,
            contact_info: contact_info && JSON.parse(contact_info),
            social_media: social_media && JSON.parse(social_media)
        }

    },

    stringifySeeker: (seeker, id) => {


        const { contact_info, interests, past_experience, education, skills, references, social_media, projects, seen } = seeker
        return {
            ...seeker,
            user_id: id && id,
            contact_info: contact_info && JSON.stringify(contact_info),
            interests: interests && JSON.stringify(interests),
            past_experience: past_experience && JSON.stringify(past_experience),
            education: education && JSON.stringify(education),
            skills: skills && JSON.stringify(skills),
            references: references && JSON.stringify(references),
            social_media: social_media && JSON.stringify(social_media),
            projects: projects && JSON.stringify(projects),
            seen: seen && JSON.stringify(seen)
        }

    },

    stringifyEmployer: (employer, id) => {

        const { contact_info, social_media } = employer

        return {
            ...employer,
            user_id: id && id,
            contact_info: contact_info && JSON.stringify(contact_info),
            social_media: social_media && JSON.stringify(social_media)
        }

    }

}