import axios from 'axios';

const Teachers = (props) => {
    const userToken = localStorage.getItem('userToken');
    //STATE

    //FUNCTIONS
    const authorizeUser = (e, id) => {
        e.preventDefault();
        axios.put("/api/teachers/authTeacher/" + id, {
        headers: {
            'auth-token': userToken
        }
        })
        .then((res) => {
            console.log(res.data);
            props.readAllTeachers();
        })
        .catch((err) => {
            console.log(err);
        })
    }
    const deleteTeacher = (e, id) => {
        e.preventDefault();
        axios.delete("/api/teachers/deleteTeacher/" + id, {
        headers: {
            'auth-token': userToken
        }
        })
        .then((res) => {
            console.log(res.data);
            props.readAllTeachers();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="teachers-container">
            <div className="teacher-cards">
                {props.teachers.map(teacher => 
                <div className="class-card" key={teacher._id}>
                    <h3>{teacher.name}</h3>
                    <p>Auth status: {teacher.isAuthed ? "Authorized" : "Unauthorized"}</p>
                    <button onClick={(e) => authorizeUser(e, teacher._id)}>Authorize</button>
                    <button onClick={(e) => deleteTeacher(e, teacher._id)}>Remove teacher</button>
                </div>
                )}
            </div>
        </div>
    )
}

export default Teachers