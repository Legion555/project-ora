import { useState } from 'react';
import axios from 'axios';

const Classes = (props) => {
    //STATE
    //Add class
    const [addClassName, setAddClassName] = useState('');
    const [addClassBook, setAddClassBook] = useState('');
    const [addClassLocalTeacher, setAddClassLocalTeacher] = useState('');

    //FUNCTIONS
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
            props.readAllClasses();
            setAddClassName(''); setAddClassBook(''); setAddClassLocalTeacher('');
        })
    }
    const deleteClass = (id) => {
        axios.delete("/api/classes/delete/" + id)
        .then((res) => {
            console.log('Class deleted');
            props.readAllClasses();
        })
        .catch((err) => {
            console.log(err);
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
            props.setClassData(res.data[0]);
            props.setView('class');
        })

        .catch((error) => {
            console.error("Error: " + error)
        })
    }

    return (
        <div className="classes-container">
            <form className="add-class">
                <input type="text" value={addClassName} placeholder="Class name" onChange={(e) => setAddClassName(e.target.value)}></input>
                <input type="text" value={addClassBook} placeholder="Class book" onChange={(e) => setAddClassBook(e.target.value)}></input>
                <input type="text" value={addClassLocalTeacher} placeholder="Local teacher" onChange={(e) => setAddClassLocalTeacher(e.target.value)}></input>
                <button onClick={createClass}>Add class</button>
            </form>
            <div className="class-cards">
                {props.classes.map(_class => 
                <div className="class-card" key={_class._id}>
                    <h3>{_class.name}</h3>
                    <p>Book: {_class.book}</p>
                    <p>Students: {_class.students.length}</p>
                    <button onClick={(id) => getClassData(_class._id)}>View class</button><br/>
                    <button onClick={(id) => deleteClass(_class._id)} className="delete-class-button">Delete class</button>
                </div>
                )}
            </div>
        </div>
    )
}

export default Classes