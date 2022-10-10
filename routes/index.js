const routes = require('express').Router();

routes.use('/students', require('./students'))
routes.use('/', require('./auth'))

module.exports = routes;