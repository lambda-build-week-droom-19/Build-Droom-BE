const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_SECRET || 'dougnuts'

module.exports = (req, res, next) => {

    const { authorization } = req.headers

    if (authorization) {

        jwt.verify(authorization, jwtKey, (err, decoded) => {

            if (err) {
                console.log(err)
                return res.status(401).json(err)
            }

            req.decoded = decoded

            next()

        })

    } else {

        return res.status(401).json({
            error: 'No token provided, must include in Authorization header'
        })

    }

}
