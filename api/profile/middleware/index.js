module.exports = {

    parseSeeker: seeker => {


        const { first_name, last_name, position, location, bio, job_type, contact_info, interests, past_experience, education, skills, references, social_media, portfolio, resume, projects, niche, seen, timestamp } = seeker

        return {
            ...seeker,
            first_name: first_name ? first_name : 'John',
            last_name: last_name ? last_name : 'Doe',
            position: position ? position : 'Unemployed',
            location: location ? location : 'home',
            bio: bio ? bio : 'Lorem ipsum',
            job_type: job_type ? job_type : 'job_type',
            contact_info: contact_info ? JSON.parse(contact_info) : {
                phone_number: '1234567890',
                email: 'someone@something.something'
            },
            interests: interests ? JSON.parse(interests) : [],
            education: education ? JSON.parse(education) : [],
            skills: skills ? JSON.parse(skills) : [],
            references: references ? JSON.parse(references) : [
                {
                    name: '',
                    relationship: '',
                    phone: '',
                    email: '',
                }
            ],
            social_media: social_media ? JSON.parse(social_media) : {
                facebook: '',
                linkedIn: '',
                twitter: '',
                github: '',
            },
            portfolio: portfolio ? portfolio : 'portfolio',
            resume: resume ? resume : 'resume',
            projects: projects ? JSON.parse(projects) : [],
            niche: niche ? niche : 1,
            past_experience: past_experience ? JSON.parse(past_experience) : [
                {
                    name: '',
                    title: '',
                    description: '',
                }
            ],
            seen: seen ? JSON.parse(seen) : [],
            timestamp: timestamp && timestamp,
        }

    },

    parseEmployer: employer => {

        const { name, location, about, contact_info, social_media, website } = employer

        return {
            ...employer,
            name: name ? name : 'Company Name',
            location: location ? location : 'N/A',
            about: about ? about : 'Lorem ipsum',
            contact_info: contact_info ? JSON.parse(contact_info) : {
                phone: '1234567890',
                email: 'company@something.something'
            },
            social_media: social_media ? JSON.parse(social_media) : {
                facebook: '',
                linkedIn: '',
                twitter: '',
                github: '',
            },
            website: website ? website : 'url',
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