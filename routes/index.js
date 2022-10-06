const routes = require('express').Router();

routes.use('/students', require('./students'))
routes.use('/auth', require('./auth'))

module.exports = routes;