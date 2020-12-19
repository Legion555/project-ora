import { useState, useEffect } from 'react';
import axios from 'axios';
//Material-UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const studentIdGen = (studentName) => {
    const randomNum = Math.floor(Math.random() * 10000)
    return `ST_${studentName}_${randomNum}`
}

const TeacherStudents = (props) => {
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');
    const [students, setStudents] = useState({});
    const [classes, setClasses] = useState({});

    useEffect(() => {
        ReadData();
    // eslint-disable-next-line
    }, []);
    const ReadData = () => {
        //read classes
        axios.get('./api/classes/readTeacherClasses',
        { params: { teacherId: props.userData._id } } )
        .then((res) => {
            setClasses(res.data);
            const nestedStudentList = res.data.map(_class => _class.students);
            const studentList = nestedStudentList.flat(1);
            setStudents(studentList);
            props.setSubView('view-list');
        })
        .catch(err => {
            console.error("Error: " + err);
        })
    }

    //FUNCTIONS
    //Create student
    const [addStudentName, set_addStudentName] = useState('');
    const [addStudentEmail, set_addStudentEmail] = useState('');
    const [addStudentAge, set_addStudentAge] = useState('');
    const [addStudentClassId, set_addStudentClassId] = useState('');
    const createStudent = (e) => {
        e.preventDefault();
        const payload = {
            studentId: studentIdGen(addStudentName),
            studentName: addStudentName,
            studentEmail: addStudentEmail,
            studentAge: addStudentAge,
            classId: addStudentClassId,
        }
        axios.put('/api/classes/createStudent', payload)
        .then(res => {
            const classData = {
                schoolId: props.userData.school.id,
                className: res.data.name,
                classId: res.data._id
            }
            axios.put('/api/schools/addClass', classData)
            .then(res => {
                ReadData();
                props.setSubView('view-list');
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
        <div className="students-container section__container">

            <div className="section-nav">
                <h3 onClick={() => console.log(students)}>
                {props.subView === 'view-list' && 'View students'}
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
            <div className="content-container view-students__container">
                {students.length > 0 && students.map(student => 
                <div className="student__card" key={student._id}>
                    <h1>{student.name}</h1>
                    <p>Class: {student.class}</p>
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
                    <TextField fullWidth variant="outlined" label="Student name" className="input"
                        onChange={(e) => set_addStudentName(e.target.value)} value={addStudentName}/>
                    <TextField fullWidth variant="outlined" label="Student email" className="input"
                        onChange={(e) => set_addStudentEmail(e.target.value)} value={addStudentEmail}/>
                    <TextField fullWidth variant="outlined" label="Student age" className="input"
                        onChange={(e) => set_addStudentAge(e.target.value)} value={addStudentAge}/>
                    <select value={addStudentClassId} onChange={(e) => set_addStudentClassId(e.target.value)}>
                        <option value="" disabled>Choose a class</option>
                        {classes.map(_class => _class.name &&
                            <option value={_class._id} key={_class._id}>{_class.name}</option>
                        )}
                    </select>

                    <Button fullWidth variant="contained" color="primary" onClick={createStudent}>
                        Create student
                    </Button>
                </form>
            </div>
            }            

        </div>
    )
}

export default TeacherStudents