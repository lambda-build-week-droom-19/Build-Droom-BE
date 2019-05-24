const jwt = require('jsonwebtoken')

module.exports = user => {

    const payload = {
        id: user.id,
        username: user.username,
        user_type: user.user_type
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, process.env.JWT_SECRET, options)

}
