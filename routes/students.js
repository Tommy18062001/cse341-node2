
const routes = require("express").Router();
const controller = require('../controllers/students');

// require the validation 
const validate = require("../middleware/validate");

// GET all students
routes.get('/', controller.getStudents)

// GET specific student
routes.get('/:id', controller.getStudent)

// POST student
routes.post('/', validate.saveStudent, controller.createStudent)

// PUT student
routes.put('/:id', validate.saveStudent, controller.updateStudent)

// DELETE student
routes.delete('/:id', controller.deleteStudent)


module.exports = routes;