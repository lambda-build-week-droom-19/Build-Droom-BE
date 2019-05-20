const router = require('express').Router()
const Users = require('../../data/actions');

const auth = require('../auth/auth-middleware/auth')

router.get('/:db', auth, async (req, res) => {

    const { db } = req.params

    const { id } = req.headers

    try {

        const get = await Users.find(db, id)

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


module.exports = router
