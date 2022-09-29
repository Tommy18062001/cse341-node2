const routes = require('express').Router();

routes.use('/students', require('./students'))

module.exports = routes;