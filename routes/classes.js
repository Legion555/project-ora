const router = require('express').Router();
const Class = require('../models/Class');
const verify = require('./verifyToken');

//CLASSES
//create class
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
//read all classes
router.get('/', verify, (req, res) => {
  Class.find().then(items => res.json(items));
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

//read single class
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Class.find({_id: id}).then(items => res.json(items));
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


module.exports = router;