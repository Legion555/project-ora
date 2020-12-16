const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//req: ADMIN privileges
//Read all teachers
router.get('/', (req, res) => {
  User.find({authority: "teacher"})
  .then(data => res.json(data))
  .catch(err=>res.send(err))
})



//req: MANAGER privileges
//create teacher
router.post('/createTeacher', async (req,res) => {

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newTeacher = new User({
    authority: 'teacher',
    isAuthed: true,
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    school: {name: req.body.schoolName, id: req.body.schoolId}
  });
  try{
      const savedTeacher = await newTeacher.save();
      res.send(newTeacher);
  }catch(err){
      res.status(400).send(err);
  }
})

//read all authorized teachers
router.get('/readAuthorizedTeachers', (req, res) => {
  User.find({authority: "teacher", "school.id": req.query.schoolId})
  .then(data =>
    res.json(data)
  )
  .catch(err =>
    res.send(err)
  )
})

//add class to teacher
router.put('/addClass', async (req,res) => {
  User.update(
    { "_id": req.body.teacherId },
    { $push: { classes:
      { name: req.body.className, id: req.body.classId } } },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
})
//remove class from teacher
router.put('/removeClass', async (req,res) => {
  User.update(
    { "_id": req.body.teacherId },
    { $pull: { classes: {id: req.body.classId}}}, 
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

//delete teacher
router.delete('/deleteTeacher/:id', (req, res) => {
  const id = req.params.id;
  User.deleteOne({ _id: id },
  function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})
// //authorize teacher
// router.put('/authTeacher/:id', (req, res) => {
//   const id = req.params.id;
//   User.findByIdAndUpdate(
//     { _id: id },  
//     { isAuthed: true },
//     function(err, result) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// })
// //delete teacher
// router.delete('/deleteTeacher/:id', verify, (req, res) => {
//   const id = req.params.id;
//   User.deleteOne({ _id: id },
//   function(err, result) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   })
// })

// //add class to teacher - for reference
// router.put('/addClass', (req, res) => {
//   User.findByIdAndUpdate(
//     { _id: req.body.userId  },  
//     { classes: req.body.classes },
//     function(err, result) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// })
// //delete class from teacher - for reference
// router.put('/deleteClass', verify, (req, res) => {
//   console.log(req.body);
//   User.findByIdAndUpdate(
//     { _id: req.body.userId  },  
//     { classes: req.body.classes },
//     function(err, result) {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// })

module.exports = router;