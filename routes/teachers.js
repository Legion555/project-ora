const router = require('express').Router();
const User = require('../models/User');
const verify = require('./verifyToken');

//read all teachers
router.get('/', verify, (req, res) => {
  // User.find().then(items => res.json(items));
  User.find({authority: "teacher"})
  .then(data => res.json(data))
  .catch(err=>res.send(err))
})
//authorize teacher
router.put('/authTeacher/:id', (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(
    { _id: id },  
    { isAuthed: true },
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
router.delete('/deleteTeacher/:id', verify, (req, res) => {
  const id = req.params.id;
  User.remove({ _id: id },
  function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

//add class
router.put('/addClass', verify, (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.body.id },  
    { classes: req.body.classes },
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