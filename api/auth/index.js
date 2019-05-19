const router = require('express').Router()
const bcrypt = require('bcryptjs')

const auth = require('./auth-middleware/auth')
const makeToken = require('./auth-middleware/makeToken')
const Users = require('./model')

router.get('/:db', auth, async (req, res) => {

    const { db } = req.params

    try {

        const get = await Users.find(db)

        res.status(200).json(get)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }

})

router.get('/:db/:id', auth, async (req, res) => {

    const { db, id } = req.params

    try {

        const getId = await Users.find(db, id)

        res.status(200).json(getId)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }

})

router.post('/:db/register', async (req, res) => {

    const { db } = req.params

    const { body } = req

    if (body && body.username && body.password) {

        body.password = bcrypt.hashSync(body.password, 10)

        try {

            const post = await Users.add(db, body)

            res.status(200).json({
                username: body.username,
                id: post[0]
            })

        } catch (err) {

            console.log(err)

            res.status(500).json({
                error: 'Internal Server Error',
                err
            })

        }

    } else {

        res.status(404).json({
            error: 'You must include a username AND a password in your request.'
        })

    }


})

router.post('/:db/login', async (req, res) => {

    const { db } = req.params

    let { username, password } = req.body

    try {

        const user = await Users.findByUsername(db, username)

        if (user && bcrypt.compareSync(password, user.password)) {

            const token = makeToken(user)

            res.status(200).json({
                message: `Welcome, ${username}!`,
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
