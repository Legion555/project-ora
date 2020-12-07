import {useState} from 'react';
import axios from 'axios';
import { FaPowerOff } from 'react-icons/fa';

const Dashboard = (props) => {
    const [classData, setClassData] = useState({});
    const [classes, setClasses] = useState({});
    //Add class
    const [addClassName, setAddClassName] = useState('');
    const [addClassBook, setAddClassBook] = useState('');
    const [addClassLocalTeacher, setAddClassLocalTeacher] = useState('');
    
    const [studentData, setStudentData] = useState([]);
    const [view, setView] = useState('');
    //Add student
    const [studentName, setStudentName] = useState('');
    const [studentAge, setStudentAge] = useState('');
    const [studentClass, setStudentClass] = useState('');

    const [renderCounter, setRenderCounter] = useState(0);
    
    //FUNCTIONS
    const numGen = () => {
        return Math.floor(Math.random() * 100000);
    }

    const logout = () => {
        localStorage.clear();
        props.setLoggedIn(false);
    }

    const getStudentData = () => {
        axios.get('./api/students/')
        .then((res) => {
        console.log(res.data);
        setStudentData(res.data);
        setView('students');
        })
        .catch((error) => {
        console.error("Error: " + error)
        })
    }
    const getOneStudent = (id) => {
        axios.get('./api/students/' + id)
        .then((res) => {
        console.log(res.data);
        })
        .catch((error) => {
        console.error("Error: " + error)
        })
    }

    const createClass = (e) => {
        e.preventDefault();
        const payload = {
            name: addClassName,
            book: addClassBook,
            localTeacher: addClassLocalTeacher,
            students: []
        }
        axios.post('/api/classes/create', payload)
        .then(function (response) {
            console.log('Class added successfully.');
            setAddClassName(''); setAddClassBook(''); setAddClassLocalTeacher('');
        })
    }
    const readAllClasses = () => {
        const userToken = localStorage.getItem('userToken');
        axios.get('./api/classes', {
        headers: {
            'auth-token': userToken
        }
        })
        .then((res) => {
            console.log(res.data);
            setClasses(res.data);
            setView('classes');
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }
    const getClassData = (id) => {
        const userToken = localStorage.getItem('userToken');
        axios.get('./api/classes/' + id, {
        headers: {
            'auth-token': userToken
        }
        })
        .then((res) => {
            console.log(res.data[0]);
            setClassData(res.data[0]);
            setView('class');
        })

        .catch((error) => {
            console.error("Error: " + error)
        })
    }
    
    //Add student
    const createStudent = (e) => {
        e.preventDefault();
        const newClassData = classData;
        const student = {
          "name": studentName,
          "age": studentAge,
          "class": classData.name,
          "_id": numGen()
        }
        newClassData.students.push(student);
        axios.put("/api/classes/createStudent", classData)
        .then((res) => {
            console.log(res.data);
            setClassData(newClassData);
            setStudentName(''); setStudentAge('');
        })
        .catch((err) => {
            console.log(err);
        })
    }
    //Remove student
    const deleteStudent = (id) => {
        const newClassData = classData;
        let removeIndex = newClassData.students.map(function(student) { return student._id; }).indexOf(id);
        newClassData.students.splice(removeIndex, 1);
        axios.put("/api/classes/deleteStudent", newClassData)
        .then((res) => {
            console.log(res.data);
            setClassData(newClassData);
            setRenderCounter(renderCounter + 1);
        })
        .catch((err) => {
            console.log(err);
        })
    }
  
    return (
        <div className="dashboard">
            <div className="navigation-container">
                <div className="links">
                    {/* <a>Profile</a> */}
                    <a onClick={readAllClasses}>Classes</a>
                </div>
                <div className="logout">
                    <a onClick={logout}><FaPowerOff /></a>
                </div>
            </div>
            {/* <form className="add-class-container">
                <input type="text" value={addClassName} placeholder="Class name" onChange={(e) => setAddClassName(e.target.value)}></input>
                <input type="text" value={addClassBook} placeholder="Class book" onChange={(e) => setAddClassBook(e.target.value)}></input>
                <input type="text" value={addClassLocalTeacher} placeholder="Local teacher" onChange={(e) => setAddClassLocalTeacher(e.target.value)}></input>
                <button onClick={createClass}>Add class</button>
            </form> */}
            <div className="content-container">
                <div className="breadcrumb">

                </div>
                <div className="classes-container">
                    {view === 'classes' && classes.map(_class => 
                    <div className="class-card" key={_class._id}>
                        <h3>{_class.name}</h3>
                        <p>Book: {_class.book}</p>
                        <p>Students: {_class.students.length}</p>
                        <button onClick={(id) => getClassData(_class._id)}>View class</button>
                    </div>
                    )}
                </div>
                {view === 'class' &&
                <div className="class-dashboard">
                    <div className="class-details-container">
                        <h2>{classData.name}</h2>
                        <h2>{classData.book}</h2>
                        <h2>{classData.localTeacher}</h2>
                    </div>
                    <form className="add-student-container">
                        <input type="text" value={studentName} placeholder="name..." onChange={(e) => setStudentName(e.target.value)}></input>
                        <input type="text" value={studentAge} placeholder="age..." onChange={(e) => setStudentAge(e.target.value)}></input>
                        <button onClick={createStudent}>Add student</button>
                    </form>
                    <div className="students-container">
                        {classData.students.map(student =>
                            <div className="student-card">
                                <h3>{student.name}</h3>
                                <p>Age: {student.age}</p>
                                <button onClick={(id) => deleteStudent(student._id)}>Remove student</button>
                            </div>
                        )}
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Dashboard