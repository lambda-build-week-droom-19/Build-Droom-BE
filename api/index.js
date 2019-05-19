const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const login = require('./auth')
const users = require('./users')
const profile = require('./profile')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())

server.use('/auth', login)

server.use('/users', users)

server.use('/profile', profile)

module.exports = server
