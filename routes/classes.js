const router = require('express').Router();
const Class = require('../models/Class');
const verify = require('./verifyToken');

//CLASSES
//create class
router.post('/create', verify, async (req,res) => {

    const newClass = new Class({
        name: req.body.name,
        book: req.body.book,
        localTeacherName: req.body.localTeacherName,
        localTeacherId: req.body.localTeacherId
    });
    try{
        const savedClass = await newClass.save();
        res.send(newClass._id);
    }catch(err){
        res.status(400).send(err);
    }
})
//read all classes
router.get('/', (req, res) => {
  Class.find().then(items => res.json(items));
})
//read authorized classes classes
router.get('/readAuthorizedClasses', (req, res) => {
  Class.find({ _id: { $in: req.query.classIds } },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  )
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
router.get('/:id', verify, (req, res) => {
  const id = req.params.id;
  Class.find({_id: id}).then(items => res.json(items));
})


//STUDENTS
//create student
router.put('/createStudent', verify, (req, res) => {
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
router.put('/deleteStudent', verify, (req, res) => {
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