import { useState, useEffect } from 'react';
import axios from 'axios';
//Material-UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Classes = (props) => {
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');
    const [classes, setClasses] = useState({});
    const [teachers, setTeachers] = useState({});
    //Add class inputs
    const [addClassName, setAddClassName] = useState('');
    //Assign teacher
    const [inputAssignTeacherClassId, setInputAssignTeacherClassId] = useState('');
    const [inputAssignTeacherId, setInputAssignTeacherId] = useState('');

    useEffect(() => {
        readClasses()
        readTeachers()

        //cleanup after component unmounts
        return () => {
            setClasses({});
            setTeachers({});
        };
    // eslint-disable-next-line
    }, []);
    const readClasses = () => {
        axios.get('./api/classes/readSchoolClasses',
        { params: { schoolId: props.userData.school.id } } )
        .then((res) => {
            setClasses(res.data);
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }
    const readTeachers = () => {
        //readByschool
        axios.get('./api/teachers/readAuthorizedTeachers',
        { params: { schoolId: props.userData.school.id } } )
        .then((res) => {
            setTeachers(res.data);
            props.setSubView('view-list');
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }

    //FUNCTIONS
    //Create class
    const createClass = (e) => {
        e.preventDefault();
        const payload = {
            className: addClassName,
            schoolName: props.userData.school.name,
            schoolId: props.userData.school.id
        }
        axios.post('/api/classes/createClass', payload)
        .then(res => {
            const classData = {
                schoolId: props.userData.school.id,
                className: res.data.name,
                classId: res.data._id
            }
            axios.put('/api/schools/addClass', classData)
            .then(res => {
                readClasses();
                props.setSubView('view-list');
                setAddClassName('');
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    //assign teacher to class
    const assignTeacher = (e) => {
        e.preventDefault();
        const chosenClass = classes.filter(_class => _class._id === inputAssignTeacherClassId);
        const chosenTeacher = teachers.filter(teacher => teacher._id === inputAssignTeacherId );
        const payload = {
          "classId": chosenClass[0]._id,
          "className": chosenClass[0].name,
          "teacherId": chosenTeacher[0]._id,
          "teacherName": chosenTeacher[0].name
        }
        //assign teacher to class
        axios.put("/api/classes/addTeacher", payload)
        .then((res) => {
            //assign class to teacher
            if ( !chosenTeacher[0].classes.some( _class => _class.id === chosenClass[0]._id ) ) {
                axios.put("/api/teachers/addClass", payload)
                .then(res => {
                    readClasses();
                    props.setSubView('view-list');
                })
                .catch(err => {
                    console.log(err);
                })
            } else {
                readClasses();
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    //Delete class
    const deleteClass = (e, classId, teacherId) => {
        e.preventDefault();
        //delete class document
        axios.delete("/api/classes/deleteClass/" + classId)
        .then(res => {
            //remove class ref from school
            const payload = {
                schoolId: props.userData.school.id,
                classId: classId,
                teacherId: teacherId
            }
            axios.put('/api/schools/removeClass', payload)
            .then(res => {
                //remove class ref from teacher
                axios.put('/api/teachers/removeClass', payload)
                readClasses();
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="classes-container section__container">

            <div className="section-nav">
                <h3>
                {props.subView === 'view-list' && 'View classes'}
                {props.subView === 'create-class' && 'Create class'}
                {props.subView === 'assign-teacher' && 'Assign teacher'}
                </h3>
                <p>
                Classes / {props.subView === 'view-list' && 'View classes'}
                {props.subView === 'create-class' && 'Create class'}
                {props.subView === 'assign-teacher' && 'Assign teacher'}
                </p>
            </div>

            {props.subView === "view-list" &&
            <div className="content-container view-classes__container">
                {classes.length > 0 && classes.map(_class => 
                <div className="class__card" key={_class._id}>
                    <h1>{_class.name}</h1>
                    <p>Teacher: {_class.teacher.name}</p>
                    <br/>
                    <br/>
                </div>
                )}
            </div>
            }

            {props.subView === "create-class" &&
            <div className="content-container">
                <form className="add-class">
                    <TextField fullWidth variant="outlined" label="Class name" className="input"
                        onChange={(e) => setAddClassName(e.target.value)} value={addClassName}/>

                    <Button fullWidth variant="contained" color="primary" onClick={createClass}>
                    Create class
                    </Button>
                </form>
            </div>
            }

            {props.subView === "assign-teacher" &&
            <div className="content-container">
                <form className="assign-teacher">
                    <div className="assignment__container">
                        <div>
                            <select value={inputAssignTeacherClassId} onChange={(e) => setInputAssignTeacherClassId(e.target.value)}>
                                <option value="" disabled>Choose a class</option>
                                {classes.map(_class => _class.teacher.name === 'unassigned' &&
                                    <option value={_class._id} key={_class._id}>{_class.name}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <select value={inputAssignTeacherId} onChange={(e) => setInputAssignTeacherId(e.target.value)} >
                                <option value="" disabled>Choose a teacher</option>
                                {teachers.map(teacher => 
                                    <option value={teacher._id} key={teacher._id}>{teacher.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <Button fullWidth variant="contained" color="primary" onClick={(e) => assignTeacher(e)}>
                        Assign Teacher
                    </Button>
                </form>
            </div>
            }
            

        </div>
    )
}

export default Classes