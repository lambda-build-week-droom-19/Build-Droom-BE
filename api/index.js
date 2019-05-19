const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const login = require('./auth')

const server = express()

server.use(express.json())
server.use(helmet())
server.use(morgan('dev'))
server.use(cors())

server.use('/auth', login)

module.exports = server
