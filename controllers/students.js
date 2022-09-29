const Student = require('../modules/student');

// GET all student 
const getStudents = async (req, res, next) => {
    Student.find()
      .then((studentList) => {
        res.status(200).json(studentList);
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  };
  
  // GET a specific student
  const getStudent = async (req, res, next) => {
    const studentId = req.params.id;
  
    Student.find({ _id: studentId })
      .then((student) => {
        res.status(200).json(student);
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  };
  
  // POST REQUEST
  const createStudent = async (req, res, next) => {
    const student = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      startDate: req.body.startDate,
      email: req.body.email,
      major: req.body.major,
      courses: req.body.courses,
      isGraduated: req.body.isGraduated,
    });
  
    // mongodb method to save
    student.save()
      .then((createdStudent) => {
        res.status(201).json(createdStudent);
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  };

  module.exports = {
    getStudents,
    getStudent,
    createStudent
  }