const router = require('express').Router();
const School = require('../models/School');


//req: Admin priveleges
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
        { manager: {managerName: req.body.managerName, managerId: req.body.managerId} },
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

module.exports = router;