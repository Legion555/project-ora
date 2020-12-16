import { useState, useEffect } from 'react';
import axios from 'axios';

const Teachers = (props) => {
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');
    const [functionView, setFunctionView] = useState('');
    const [teachers, setTeachers] = useState({});
    //Add teacher inputs
    const [addTeacherName, setAddTeacherName] = useState('');
    const [addTeacherEmail, setAddTeacherEmail] = useState('');
    const [addTeacherPassword, setAddTeacherPassword] = useState('');

    useEffect(() => {
        readTeachers()

        //cleanup after component unmounts
        return () => {
            setTeachers({});
        };
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
                setFunctionView('');
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
        <div className="teachers-container">

            <div className="section-nav">
                <div className="breadcrumb">
                    <p>Teachers</p>
                </div>
                <div className="functions">
                    <button className="button-create-teacher" onClick={() => setFunctionView("create-teacher")}>create</button>
                </div>
            </div>

            <div className="functions-container">
                {functionView === "create-teacher" &&
                <form className="add-school">
                    <input type="text" value={addTeacherName} placeholder="Teacher name" onChange={(e) => setAddTeacherName(e.target.value)} autoFocus></input>
                    <input type="text" value={addTeacherEmail} placeholder="Teacher email" onChange={(e) => setAddTeacherEmail(e.target.value)}></input>
                    <input type="text" value={addTeacherPassword} placeholder="Teacher password" onChange={(e) => setAddTeacherPassword(e.target.value)}></input>
                    <button onClick={createTeacher}>Create teacher</button>
                    <button onClick={() => setFunctionView("")}>Cancel</button>
                </form>
                }
            </div>

            <div className="teachers-info">
                {teachers.length > 0 && teachers.map(teacher => 
                <div className="teacher-info" key={teacher._id}>
                    <h1>{teacher.name}</h1>
                    <p>Email:<br/>{teacher.email}</p><br/>
                    <p>Classes: </p>
                    {teacher.classes.map(_class => 
                        <p key={_class.id}>{_class.name}</p>
                    )}
                    <button onClick={(e) => deleteTeacher(e, teacher._id)}>Delete teacher</button>
                    <br/>
                    <br/>
                </div>
                )}
            </div>

        </div>
    )
}

export default Teachers