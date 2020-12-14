const router = require('express').Router();
const User = require('../models/User');
//Validation imports
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');

//req: Admin priveleges
//create admin
router.post('/createAdmin', async (req,res) => {

  //Check if user already exists
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.send("email-duplicate");

  //Validation
  const {error} = registerValidation(req.body);
  if(error) return res.send(error.details[0].message);
  
  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newAdmin = new User({
    authority: 'admin',
    isAuthed: true,
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try{
      const savedAdmin = await newAdmin.save();
      res.send(newAdmin._id);
  }catch(err){
      res.status(400).send(err);
  }
})

module.exports = router;