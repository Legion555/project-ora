const router = require('express').Router();
const School = require('../models/School');


//req: ADMIN priveleges
//create school
router.post('/createSchool', async (req,res) => {

    //Check if user already exists
    const schoolExist = await School.findOne({name: req.body.name});
    if(schoolExist) return res.send("School already exists");
  
    const newSchool = new School({
      name: req.body.name,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
      manager: req.body.manager
    });
    try{
        const savedSchool = await newSchool.save();
        res.send(newSchool._id);
    }catch(err){
        res.status(400).send(err);
    }

})

//read all schools
router.get('/', (req, res) => {
    School.find().then(items => res.json(items));
})

//assign manager to school
router.put('/addManager', async (req,res) => {
    School.findByIdAndUpdate(
        { _id: req.body.schoolId },  
        { manager: {name: req.body.managerName, id: req.body.managerId} },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
    );
})

//delete school
router.delete('/deleteSchool/:id', (req, res) => {
  const id = req.params.id;
  School.deleteOne({ _id: id },
  function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})



//req: MANAGER priveleges
//add class ref to school
router.put('/addClass', async (req,res) => {
  School.update(
    { "_id": req.body.schoolId },
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
//remove class ref from school
router.put('/removeClass', async (req,res) => {
  School.update(
    { "_id": req.body.schoolId },
    { $pull: { classes: {id: req.body.classId} } },
  function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  }
);
})

//assign teacher to school
router.put('/addTeacher', async (req,res) => {
  School.update(
    { "_id": req.body.schoolId },
    { $push: { teachers:
      { name: req.body.teacherName, id: req.body.teacherId } } },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
})
//remove teacher from school
router.put('/removeTeacher', async (req,res) => {
  School.update(
    { "_id": req.body.schoolId },
    { $pull: { teachers: {id: req.body.teacherId}}}, 
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

//remove teacher from school

module.exports = router;