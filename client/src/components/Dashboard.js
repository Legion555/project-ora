import {useState} from 'react';
import axios from 'axios';

const Dashboard = (props) => {
    const [studentData, setStudentData] = useState([]);
    const [classData, setClassData] = useState({});
    const [view, setView] = useState('');
    //Add student
    const [studentName, setStudentName] = useState('');
    const [studentAge, setStudentAge] = useState('');
    const [studentClass, setStudentClass] = useState('');
    
    //FUNCTIONS
    const logout = () => {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPassword');
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

    const getClassData = () => {
        const userToken = localStorage.getItem('userToken');
        axios.get('./api/classes', {
        headers: {
            'auth-token': userToken
        }
        })
        .then((res) => {
        console.log(res.data);
        setClassData(res.data);
        setView('classes');
        })
        .catch((error) => {
        console.error("Error: " + error)
        })
    }

    //Add student
    const addStudent = (e) => {
        e.preventDefault();
        if (studentName.length > 0) {
        const newStudent = {
        "name": studentName,
        "age": studentAge,
        "class": studentClass
        }
        axios.post("/api/students/register", newStudent)
        .then((res) => {
            console.log(res.data);
            setStudentName(''); setStudentAge(''); setStudentClass('');
            getStudentData();
        })
        .catch((err) => {
            console.log(err);
        })
        }
    }
    //Remove student
    const deleteStudent = (id) => {
        axios.delete("./api/students/delete/" + id)
        .then((res) => {
        console.log(res.data);
        getStudentData();
        })
        .catch((error) => {
        console.error("Error: " + error)
        })
    }
  
    return (
        <div className="dashboard">
            <div className="view-selector">
                <button onClick={getStudentData}>View student data</button>
                <button onClick={getClassData}>View class data</button>
                <button onClick={() => getOneStudent("5fc9e502fa9b2f266c1824b6")}>View one student</button>
            </div>
            <form>
                <input type="text" value={studentName} placeholder="name..." onChange={(e) => setStudentName(e.target.value)}></input>
                <input type="text" value={studentAge} placeholder="age..." onChange={(e) => setStudentAge(e.target.value)}></input>
                <input type="text" value={studentClass} placeholder="class..." onChange={(e) => setStudentClass(e.target.value)}></input>
                <button onClick={addStudent}>Add student</button>
            </form>
            <div className="content-container">
            {studentData.map(student => 
                <div className="student-card" key={student._id}>
                <p>Name: {student.name}</p>
                <p>Age: {student.age}</p>
                <p>Class: {student.class}</p>
                <button onClick={() => deleteStudent(student._id)}>Remove</button>
                </div>
            )}
            {view === 'classes' && classData.map(_class => 
                <div className="class-card" key={_class._id}>
                <p>{_class.name}</p>
                </div>
            )}
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Dashboard