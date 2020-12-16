import { useState, useEffect } from 'react';
import axios from 'axios';

const Classes = (props) => {
    // eslint-disable-next-line
    const userToken = localStorage.getItem('userToken');
    const [functionView, setFunctionView] = useState('');
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
        switch (props.userData.authority) {
            //read classes of school (for manager)
            case 'manager':
                axios.get('./api/classes/readSchoolClasses',
                { params: { schoolId: props.userData.school.id } } )
                .then((res) => {
                    setClasses(res.data);
                })
                .catch((error) => {
                    console.error("Error: " + error)
                })
                break;
            //read classes of teacher
            case 'teacher':
                axios.get('./api/classes/readTeacherClasses',
                { params: { teacherId: props.userData._id } } )
                .then((res) => {
                    setClasses(res.data);
                })
                .catch((error) => {
                    console.error("Error: " + error)
                })
                break;
            default:
                break;
        }
    }
    const readTeachers = () => {
        //readByschool
        axios.get('./api/teachers/readAuthorizedTeachers',
        { params: { schoolId: props.userData.school.id } } )
        .then((res) => {
            setTeachers(res.data);
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
                setFunctionView('');
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
                    setFunctionView('');
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
        <div className="classes-container">

            <div className="section-nav">
                <div className="breadcrumb">
                    <p>Classes</p>
                </div>
                {props.userData.authority === 'manager' &&
                <div className="functions">
                    <button className="button-assign-teacher" onClick={() => setFunctionView("assign-teacher")}>assign teacher</button>
                    <button className="button-create-class" onClick={() => setFunctionView("create-class")}>create</button>
                </div>
                }
            </div>

            <div className="functions-container">
                {functionView === "create-class" &&
                <form className="add-class">
                    <input type="text" value={addClassName} placeholder="Class name" onChange={(e) => setAddClassName(e.target.value)} autoFocus></input>
                    <button onClick={createClass}>Create class</button>
                    <button onClick={() => setFunctionView("")}>Cancel</button>
                </form>
                }
                {functionView === "assign-teacher" &&
                <form>
                    <div>
                        <label>Choose a class: </label>
                        <select value={inputAssignTeacherClassId} onChange={(e) => setInputAssignTeacherClassId(e.target.value)}>
                            <option>Please choose a class</option>
                            {classes.map(_class => _class.teacher.name === 'unassigned' &&
                                <option value={_class._id} key={_class._id}>{_class.name}</option>
                            )}
                        </select>
                        <br/>
                        <label>Choose a teacher: </label>
                        <select value={inputAssignTeacherId} onChange={(e) => setInputAssignTeacherId(e.target.value)} >
                            <option>Please choose a teacher</option>
                            {teachers.map(teacher => 
                                <option value={teacher._id} key={teacher._id}>{teacher.name}</option>
                            )}
                        </select>
                    </div>
                    <button onClick={(e) => assignTeacher(e)}>Add teacher</button>
                    <button onClick={() => setFunctionView("")}>Cancel</button>
                </form>
                }
            </div>

            <div className="classes-info">
                {classes.length > 0 && classes.map(_class => 
                <div className="class-info" key={_class._id}>
                    <h1>{_class.name}</h1>
                    <p>Teacher: {_class.teacher.name}</p>
                    {props.userData.authority === 'manager' &&
                    <button onClick={(e) => deleteClass(e, _class._id, _class.teacher.id)}>Delete class</button>
                    }
                    <br/>
                    <br/>
                </div>
                )}
            </div>

        </div>
    )
}

export default Classes