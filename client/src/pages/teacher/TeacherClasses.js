import { useState, useEffect } from 'react';
import axios from 'axios';
//Material-UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const TeacherClasses = (props) => {
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');
    const [classes, setClasses] = useState({});

    useEffect(() => {
        readClasses();
    // eslint-disable-next-line
    }, []);
    const readClasses = () => {
        axios.get('./api/classes/readTeacherClasses',
        { params: { teacherId: props.userData._id } } )
        .then((res) => {
            setClasses(res.data);
            props.setSubView('view-list');
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }

    //FUNCTIONS
    //Create student
    // const [addStudentName, set_addStudentName] = useState('');
    // const [studentInfo, setStudentInfo] = useState({
    //     name: '',

    // })
    const newStudentData = {
        name: '',
        email: '',
        password: ''
    }
    const createStudent = (e) => {
        // e.preventDefault();
        // const payload = {
        //     className: addClassName,
        //     schoolName: props.userData.school.name,
        //     schoolId: props.userData.school.id
        // }
        // axios.post('/api/classes/createClass', payload)
        // .then(res => {
        //     const classData = {
        //         schoolId: props.userData.school.id,
        //         className: res.data.name,
        //         classId: res.data._id
        //     }
        //     axios.put('/api/schools/addClass', classData)
        //     .then(res => {
        //         readClasses();
        //         props.setSubView('view-list');
        //         setAddClassName('');
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    }
    //assign teacher to class
    // const assignTeacher = (e) => {
    //     e.preventDefault();
    //     const chosenClass = classes.filter(_class => _class._id === inputAssignTeacherClassId);
    //     const chosenTeacher = teachers.filter(teacher => teacher._id === inputAssignTeacherId );
    //     const payload = {
    //       "classId": chosenClass[0]._id,
    //       "className": chosenClass[0].name,
    //       "teacherId": chosenTeacher[0]._id,
    //       "teacherName": chosenTeacher[0].name
    //     }
    //     //assign teacher to class
    //     axios.put("/api/classes/addTeacher", payload)
    //     .then((res) => {
    //         //assign class to teacher
    //         if ( !chosenTeacher[0].classes.some( _class => _class.id === chosenClass[0]._id ) ) {
    //             axios.put("/api/teachers/addClass", payload)
    //             .then(res => {
    //                 readClasses();
    //                 props.setSubView('view-list');
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //         } else {
    //             readClasses();
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }

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
                    <br/>
                    <Button fullWidth variant="contained" color="primary" >
                        View details
                    </Button>
                </div>
                )}
            </div>
            }

            {props.subView === "create-student" &&
            <div className="content-container create-student__container">
                <form className="create-student">
                    <TextField fullWidth variant="outlined" label="Class name" className="input"
                        onChange={(e) => newStudentData.name = e.target.value} value={newStudentData.name}/>

                    <Button fullWidth variant="contained" color="primary" onClick={createStudent}>
                        Create student
                    </Button>
                </form>
            </div>
            }            

        </div>
    )
}

export default TeacherClasses