const router = require('express').Router();
const Student = require('../models/Student');
const verify = require('./verifyToken');

// router.get('/', verify, (req, res) => {
//     //Find id of user object
//     // const payload = User.findbyOne({_id: req.user});
//     res.send(req.student);
// })

//Get all students
router.get('/', (req, res) => {
  Student.find().then(items => res.json(items));
})

//Get student data by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Student.find({ _id: id }).then(items => res.json(items));
  // res.send(suspect);
})

//Register new student
router.post('/register', async (req,res) => {

  //Validation
  // const {error} = registerValidation(req.body);
  // if(error) return res.status(400).send(error.details[0].message);

  //Create new student
  const newStudent = new Student({
      name: req.body.name,
      age: req.body.age,
      class: req.body.class
  });
  try{
      const savedUser = await newStudent.save();
      res.send({newStudent: newStudent._id});
  }catch(err){
      res.status(400).send(err);
  }
});


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


module.exports = router;