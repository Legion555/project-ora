const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');

//Get all users
router.get('/', (req, res) => {
    User.find().then(items => res.json(items));
})

//Get user data by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    User.find({_id: id}).then(items => res.json(items));
    // res.send(suspect);
})

//Register new user
router.post('/register', async (req,res) => {

    //Validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user already exists
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("Email already exists");

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await newUser.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//Login user
router.post('/login', async (req,res) => {
    //Validate
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email not found.");

    //Valid password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Invalid password.");

    //Create and assigning token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
})

module.exports = router;