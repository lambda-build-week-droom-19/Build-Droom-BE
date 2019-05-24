const router = require('express').Router()
const Users = require('../../data/actions');

const auth = require('../auth/auth-middleware/auth')

router.get('/', auth, async (req, res) => {

    const { id } = req.headers

    try {

        const get = await Users.find('users', id)

        res.status(200).json(get)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }

})

router.get('/:id', auth, async (req, res) => {

    const { id } = req.params

    try {

        const getId = await Users.find('users', id)

        res.status(200).json(getId)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }

})


module.exports = router
