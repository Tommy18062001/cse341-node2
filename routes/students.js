
const routes = require("express").Router();
const controller = require('../controllers/students')

// GET all students
routes.get('/', controller.getStudents)

// GET specific student
routes.get('/:id', controller.getStudent)

// POST student
routes.post('/', controller.createStudent)


module.exports = routes;