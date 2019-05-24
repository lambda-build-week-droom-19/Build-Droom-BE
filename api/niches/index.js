const router = require('express').Router()
const auth = require('../auth/auth-middleware/auth')
const Niches = require('../../data/actions')

router.get('/', async (req, res) => {

    try {

        const niches = await Niches.find('niches')

        res.status(200).json(niches)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }

})

router.post('/', auth, async (req, res) => {

    const { body } = req

    if (body.niche) {

        try {

            const newNiche = await Niches.add('niches', body)

            res.status(200).json({
                id: newNiche[0],
                niche: body.niche
            })

        } catch (err) {

            console.log(err)

            res.status(500).json({
                error: 'Internal Server Error',
                err
            })

        }

    } else {

        res.status(400).json({
            error: 'Must include niche in request.'
        })

    }

})

router.get('/employers/:niche_id', auth, async (req, res) => {

    const { niche_id } = req.params

    console.log(niche_id)

    try {

        const emps = await Niches.findEmpWithNiche(niche_id)

        res.status(200).json(emps)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }

})

router.get('/seekers/:niche_id', auth, async (req, res) => {

    const { niche_id } = req.params

    console.log(niche_id)

    try {

        const seeks = await Niches.findSeekWithNiche(niche_id)

        res.status(200).json(seeks)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            error: 'Internal Server Error',
            err
        })

    }

})

router.put('/', auth, async (req, res) => {

    const { body } = req

    const { id } = req.headers

    if (body.niche) {

        try {

            const edit = await Niches.update('niches', id, body)

            res.status(200).json(edit)

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
