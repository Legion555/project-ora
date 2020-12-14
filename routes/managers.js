const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');

//req: Admin priveleges
//create manager
router.post('/createManager', async (req,res) => {

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    const newManager = new User({
      authority: 'manager',
      isAuthed: true,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    try{
        const savedManager = await newManager.save();
        res.send(newManager._id);
    }catch(err){
        res.status(400).send(err);
    }
  })
//read all managers
router.get('/', (req, res) => {
    User.find({authority: 'manager'}).then(items => res.json(items));
  })
//assign to school
router.put('/addSchoolRef', async (req,res) => {
  User.findByIdAndUpdate(
    { _id: req.body.managerId },  
    { school: {schoolName: req.body.schoolName, managerId: req.body.schoolId} },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
);
})
//delete manager
router.delete('/deleteManager/:id', (req, res) => {
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

module.exports = router;