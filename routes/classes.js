const router = require('express').Router();
const Class = require('../models/Class');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');

//Get all users
router.get('/', (req, res) => {
    Class.find().then(items => res.json(items));
})

//Get user data by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Class.find({_id: id}).then(items => res.json(items));
    // res.send(suspect);
})

//Register new class
router.post('/register', async (req,res) => {

    //Check if user already exists
    // const classExist = await Class.findOne({name: req.body.name});
    // if(classExist) return res.status(400).send("Class already exists");

    //Create new user
    const newClass = new Class({
        name: req.body.name,
        date: req.body.date,
        book: req.body.book,
        localTeacher: req.body.localTeacher
    });
    try{
        const savedClass = await newClass.save();
        res.send({newClass: newClass._id});
    }catch(err){
        res.status(400).send(err);
    }
});


module.exports = router;