const router = require('express').Router()
const bcrypt = require('bcryptjs')

const makeToken = require('./auth-middleware/makeToken')
const Users = require('../../data/actions')

router.post('/register', async (req, res) => {

    const { body } = req

    if (body && body.username && body.password && body.user_type !== null) {

        body.password = bcrypt.hashSync(body.password, 10)

        try {

            const post = await Users.add('users', body)

            const get = await Users.find('users', post[0])

            console.log(get)

            const token = makeToken(get)

            res.status(200).json({
                username: body.username,
                id: post[0],
                user_type: body.user_type,
                token
            })

        } catch (err) {

            console.log(err)

            if (err.errno === 19) {

                res.status(400).json({
                    error: `The username '${body.username}' is already taken. Please try again with a different username.`
                })

            }

            res.status(500).json({
                error: 'Internal Server Error',
                err
            })

        }

    } else {

        res.status(404).json({
            error: 'You must include a username, a password, and a user_type in your request.'
        })

    }


})

router.post('/login', async (req, res) => {

    let { username, password } = req.body

    try {

        const user = await Users.findByUsername('users', username)

        if (user && bcrypt.compareSync(password, user.password)) {

            const token = makeToken(user)

            res.status(200).json({
                message: `Welcome, ${username}!`,
                id: user.id,
                user_type: user.user_type,
                token
            })

        } else {
            res.status(401).json({
                error: 'Invalid Credentials'
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

module.exports = router
