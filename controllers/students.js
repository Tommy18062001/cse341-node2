const Student = require('../modules/student');
const ObjectId = require("mongodb").ObjectId;

// ---------------------------------------------------- GET all student 
const getStudents = async (req, res) => {
    Student.find()
      .then((studentList) => {
        res.status(200).json(studentList);
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  };
  
// ---------------------------------------------------- GET a specific student
const getStudent = async (req, res) => {

  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid student id to find a student.")
  }
  const studentId = req.params.id;

  Student.find({ _id: studentId })
    .then((student) => {
      res.status(200).json(student);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};
  
// --------------------------------------------------- POST REQUEST
const createStudent = async (req, res) => {
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


// ---------------------------------------------------- PUT REQUEST
const updateStudent = async (req, res) => {
// validate the mongodb id 
if (!ObjectId.isValid(req.params.id)) {
  res.status(400).json("Must use a valid student id to update a student.")
}

const studentId = req.params.id;

// find the contact to update
Student.findOne({ _id: studentId })
  .then((student) => {
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.startDate = req.body.startDate;
    student.email = req.body.email;
    student.major = req.body.major;
    student.courses = req.body.courses;
    student.isGraduated = req.body.isGraduated;

    Student.updateOne({ _id: studentId }, student)
      .then((result) => {
        // 204 if the test was successfully
        res.status(204).json({message: "Update successfull"});
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  })

  .catch((error) => {
    res.status(500).json({ error: error });
  });
};

// DELETE REQUEST
const deleteStudent = async (req, res) => {
if (!ObjectId.isValid(req.params.id)) {
  res.status(400).json("Must use a valid student id to delete a student.")
}

const studentId = req.params.id;

Student.findOne({ _id: studentId })
  .then((student) => {
    student
      .deleteOne({ _id: studentId })
      .then((result) => {
        res.status(200).json({ message: "Student Deleted successfull" });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  })
  .catch((error) => {
    res.status(500).json({ error: error });
  });
};

  module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
  }