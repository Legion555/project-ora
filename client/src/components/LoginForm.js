import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const LoginForm = (props) => {
    //UserData
    // eslint-disable-next-line
    const [userData, setUserData] = useContext(UserContext);
    //View
    const [view, setView] = useState('login');
    //Login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    //Register
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    //Automatic login
    useEffect(() => {
        
        const userEmail = localStorage.getItem('userEmail');
        const userPassword = localStorage.getItem('userPassword');
        if (userEmail !== null) {
            const details = {
                email: userEmail,
                password: userPassword
            }
            // login()
            axios.post('/api/users/login', details)
            .then(function (response) {
                props.setLoggedIn(true);
                //Get User Data
                axios.get('/api/users', {
                    params: {
                        email: userEmail
                    }
                })
                .then(function (response) {
                    const newUserData = response.data;
                    setUserData(newUserData);
                    console.log(newUserData);
                })
                .catch(function (error) {
                    console.log(error);
                });
            })
        }
    // eslint-disable-next-line
    }, []);

    //Login existing user - pass
    const login = (e, email, password) => {
        e.preventDefault();
        const details = {
            email: loginEmail,
            password: loginPassword
        }
        axios.post('/api/users/login', details)
        .then(function (response) {
            const userToken = response.headers["auth-token"];
            localStorage.setItem('userToken', userToken);
            localStorage.setItem('userEmail', loginEmail);
            localStorage.setItem('userPassword', loginPassword);
            props.setLoggedIn(true);
            //Get User Data
            axios.get('/api/users', {
                params: {
                    email: loginEmail
                }
            })
            .then(function (response) {
                const newUserData = response.data;
                setUserData(newUserData);
                console.log(newUserData);
            })
            .catch(function (error) {
                console.log(error);
            });
        })
    }
    //Register new user
    const register = (e) => {
        e.preventDefault();
        const payload = {
        name: regName,
        email: regEmail,
        password: regPassword
        }
        axios.post('/api/users/register', payload)
        .then(function (response) {
        setRegName(''); setRegEmail(''); setRegPassword('');
        })
    }
    
    return (
        <div className="auth-container">
            {view === 'login' &&
            <div className="login-container">
                <h1>Login with an existing account</h1>
                <input onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" name="email" value={loginEmail}></input>
                <input onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" name="password" value={loginPassword}></input>
                <button onClick={login}>Login</button>
                <p className="register-link" onClick={() => setView('register')}>Register a new account</p>
            </div>
            }
            {view === 'register' &&
            <div className="register-container">
                <h1>Register a new account</h1>
                <form className="input-main">
                    <input onChange={(e) => setRegName(e.target.value)} placeholder="Name" name="name" value={regName}></input>
                    <input onChange={(e) => setRegEmail(e.target.value)} placeholder="Email" name="email" value={regEmail}></input>
                    <input onChange={(e) => setRegPassword(e.target.value)} placeholder="Password" name="password" value={regPassword}></input>
                    <button onClick={register}>Register</button>
                </form>
                <p className="login-link" onClick={() => setView('login')}>Login with an existing account</p>
            </div>
            }
        </div>
    )
}

export default LoginForm