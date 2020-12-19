import { useState, useEffect } from 'react';
import axios from 'axios';
//Material-UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
//Images
import Circle from '../../assets/circle.png';

const Teachers = (props) => {
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');
    const [teachers, setTeachers] = useState({});
    //Add teacher inputs
    const [addTeacherName, setAddTeacherName] = useState('');
    const [addTeacherEmail, setAddTeacherEmail] = useState('');
    const [addTeacherPassword, setAddTeacherPassword] = useState('');

    useEffect(() => {
        readTeachers()
    // eslint-disable-next-line
    }, []);
    const readTeachers = () => {
        switch (props.userData.authority) {
            //readAllTeachers
            case 'admin':
                axios.get('./api/teachers')
                .then((res) => {
                    setTeachers(res.data);
                })
                .catch((error) => {
                    console.error("Error: " + error)
                })
                break;
            //readSchoolTeachers
            case 'manager':
                axios.get('./api/teachers/readAuthorizedTeachers',
                { params: { schoolId: props.userData.school.id } } )
                .then((res) => {
                    setTeachers(res.data);
                })
                .catch((error) => {
                    console.error("Error: " + error)
                })
                break;
            default:
                break;
        }
    }

    //FUNCTIONS
    //Create teacher
    const createTeacher = (e) => {
        e.preventDefault();
        const payload = {
            name: addTeacherName,
            email: addTeacherEmail,
            password: addTeacherPassword,
            schoolName: props.userData.school.name,
            schoolId: props.userData.school.id
        }
        axios.post('/api/teachers/createTeacher', payload)
        .then(res => {
            console.log(res)
            const teacherData = {
                schoolId: res.data.school.id,
                teacherName: res.data.name,
                teacherId: res.data._id
            }
            axios.put('/api/schools/addTeacher', teacherData)
            .then(res => {
                readTeachers();
                props.setSubView('view-list');
                setAddTeacherName(''); setAddTeacherEmail(''); setAddTeacherPassword('');
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    //Delete teacher
    const deleteTeacher = (e, id) => {
        e.preventDefault();
        axios.delete("/api/teachers/deleteTeacher/" + id)
        .then((res) => {
            const payload = {
                schoolId: props.userData.school.id,
                teacherId: id
            }
            axios.put('/api/schools/removeTeacher', payload)
            .then(res => {
                readTeachers();
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="teachers-container section__container">

            <div className="section-nav">
                <h3>
                {props.subView === 'view-list' && 'View teachers'}
                {props.subView === 'create-teacher' && 'Create teacher'}
                </h3>
                <p>
                Teachers / {props.subView === 'view-list' && 'View teachers'}
                {props.subView === 'create-teacher' && 'Create teacher'}
                </p>
            </div>

            {props.subView === "view-list" &&
            <div className="content-container view-teachers__container">
                {teachers.length > 0 && teachers.map(teacher => 
                <div className="teacher__card" key={teacher._id}>
                    <img src={Circle} alt="profile" width="75px"></img>
                    <h1>{teacher.name}</h1>
                    <p>Classes: </p>
                    {teacher.classes.map(_class => 
                        <p key={_class.id}>{_class.name}</p>
                    )}
                    <button onClick={(e) => deleteTeacher(e, teacher._id)}>Delete teacher</button>
                    
                </div>
                )}
            </div>
            }

            {props.subView === "create-teacher" &&
            <div className="content-container">
                <form className="create-teacher">

                    <TextField fullWidth variant="outlined" label="Teacher name" className="input"
                        onChange={(e) => setAddTeacherName(e.target.value)} value={addTeacherName}/>
                    <TextField fullWidth variant="outlined" label="Teacher email" className="input"
                        onChange={(e) => setAddTeacherEmail(e.target.value)} value={addTeacherEmail}/>
                    <TextField fullWidth variant="outlined" label="Teacher password" className="input"
                        onChange={(e) => setAddTeacherPassword(e.target.value)} value={addTeacherPassword}/>

                    <Button fullWidth variant="contained" color="primary" onClick={createTeacher}>
                        Create teacher
                    </Button>

                </form>
            </div>
            }

        </div>
    )
}

export default Teachers