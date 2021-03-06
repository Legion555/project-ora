const router = require('express').Router();
const Class = require('../models/Class');

//req: ADMIN privilege
//read all classes
router.get('/', (req, res) => {
  Class.find().then(items => res.json(items));
})



//req: MANAGER privilege
//create class
router.post('/createClass', async (req,res) => {
    const newClass = new Class({
        name: req.body.className,
        school: {name: req.body.schoolName, id: req.body.schoolId}
    });
    try{
        const savedClass = await newClass.save();
        res.send(newClass);
    }catch(err){
        res.status(400).send(err);
    }
})

//read school classes
router.get('/readSchoolClasses', (req, res) => {
  Class.find({ "school.id": req.query.schoolId },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  )
})

//assign teacher to class
router.put('/addTeacher', async (req,res) => {
  Class.update(
    { "_id": req.body.classId },
    { teacher: { name: req.body.teacherName, id: req.body.teacherId } },
  function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

//delete class
router.delete('/deleteClass/:id', (req, res) => {
  const id = req.params.id;
  Class.remove({ _id: id },
  function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

// //read single class
// router.get('/:id', (req, res) => {
//   Class.find({_id: req.params.id}).then(items => res.json(items));
// })

//req: TEACHER privilege
//read teacher classes
router.get('/readTeacherClasses', (req, res) => {
  Class.find({ "teacher.id": req.query.teacherId },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  )
})
//create student & add to class
router.put('/createStudent', (req,res) => {
  const newStudent = {
    id: req.body.studentId,
    name: req.body.studentName,
    email: req.body.studentEmail,
    age: req.body.studentAge,
    classId: req.body.classId
  }
  Class.update(
    { "_id": req.body.classId },
    { $push: { students: newStudent } },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
})
//transfer student to class
router.put('/transferStudent', (req,res) => {
  Class.update(
    { "_id": req.body.classId },
    { $push: { students:
      { newStudent } } },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
})
//delete student
router.put('/deleteStudent', (req,res) => {
  Class.update(
    { "_id": req.body.classId },
    { $pull: { students: {id: req.body.studentId}}}, 
        {multi: true},
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
})

module.exports = router;