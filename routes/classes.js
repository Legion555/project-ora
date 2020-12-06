const router = require('express').Router();
const Class = require('../models/Class');
const verify = require('./verifyToken');

//CLASSES
//Get all classes
router.get('/', verify, (req, res) => {
    Class.find().then(items => res.json(items));
})

//Get class data by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Class.find({_id: id}).then(items => res.json(items));
})

//Create new class
router.post('/create', async (req,res) => {

    const newClass = new Class({
        name: req.body.name,
        book: req.body.book,
        localTeacher: req.body.localTeacher,
        students: req.body.students
    });
    try{
        const savedClass = await newClass.save();
        res.send({newClass: newClass._id});
    }catch(err){
        res.status(400).send(err);
    }
})



//STUDENTS
//create student
router.put('/createStudent', (req, res) => {
  Class.findByIdAndUpdate(
    { _id: req.body._id },  
    { students: req.body.students },
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
router.put('/deleteStudent', (req, res) => {
  Class.findByIdAndUpdate(
    { _id: req.body._id },
    { students: req.body.students },
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
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  // Student.findByIdAndDelete({ _id: id }
  Student.remove({ _id: id },
  function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
});
//STUDENTS
//Get all students
// router.get('/', (req, res) => {
//     Student.find().then(items => res.json(items));
//   })
  
//   //Get student data by id
//   router.get('/:id', (req, res) => {
//     const id = req.params.id;
//     Student.find({ _id: id }).then(items => res.json(items));
//     // res.send(suspect);
//   })
  
//   //Register new student
//   router.post('/register', async (req,res) => {
  
//     //Validation
//     // const {error} = registerValidation(req.body);
//     // if(error) return res.status(400).send(error.details[0].message);
  
//     //Create new student
//     const newStudent = new Student({
//         name: req.body.name,
//         age: req.body.age,
//         class: req.body.class
//     });
//     try{
//         const savedUser = await newStudent.save();
//         res.send({newStudent: newStudent._id});
//     }catch(err){
//         res.status(400).send(err);
//     }
//   });
  
  
  


module.exports = router;