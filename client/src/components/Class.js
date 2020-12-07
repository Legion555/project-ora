import { useState } from 'react';
import axios from 'axios';

const Class = (props) => {
    //STATE
    //Add student
    const [studentName, setStudentName] = useState('');
    const [studentAge, setStudentAge] = useState('');

    //FUNCTIONS
    const numGen = () => {
        return Math.floor(Math.random() * 100000);
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
            props.setClassData(res.data[0]);
        })
        .catch((error) => {
            console.error("Error: " + error)
        })
    }
    //Add student
    const createStudent = (e) => {
        e.preventDefault();
        const newClassData = props.classData;
        const student = {
          "name": studentName,
          "age": studentAge,
          "class": props.classData.name,
          "_id": numGen()
        }
        newClassData.students.push(student);
        axios.put("/api/classes/createStudent", props.classData)
        .then((res) => {
            console.log(res.data);
            // props.setClassData(newClassData);
            setStudentName(''); setStudentAge('');
        })
        .catch((err) => {
            console.log(err);
        })
    }
    //Remove student
    const deleteStudent = (id) => {
        const newClassData = props.classData;
        let removeIndex = newClassData.students.map(function(student) { return student._id; }).indexOf(id);
        newClassData.students.splice(removeIndex, 1);
        axios.put("/api/classes/deleteStudent", newClassData)
        .then((res) => {
            console.log(res.data);
            // props.setClassData(newClassData);
            getClassData(props.classData._id)
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    return (
        <div className="class-container">
            <div className="class-details-container">
                <h2>{props.classData.name}</h2>
                <h2>{props.classData.book}</h2>
                <h2>{props.classData.localTeacher}</h2>
            </div>
            <form className="add-student-container">
                <input type="text" value={studentName} placeholder="name..." onChange={(e) => setStudentName(e.target.value)}></input>
                <input type="text" value={studentAge} placeholder="age..." onChange={(e) => setStudentAge(e.target.value)}></input>
                <button onClick={createStudent}>Add student</button>
            </form>
            <div className="students-container">
                {props.classData.students.map(student =>
                    <div className="student-card">
                        <h3>{student.name}</h3>
                        <p>Age: {student.age}</p>
                        <button onClick={(id) => deleteStudent(student._id)}>Remove student</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Class