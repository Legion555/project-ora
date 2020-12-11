const router = require('express').Router();
const User = require('../models/User');
const verify = require('./verifyToken');

//read all teachers
router.get('/', verify, (req, res) => {
  User.find().then(items => res.json(items));
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
//delete class
router.delete('/delete/:id', (req, res) => {
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

module.exports = router;