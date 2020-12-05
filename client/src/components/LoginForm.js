import { useState, useEffect } from 'react';
import axios from 'axios';

const LoginForm = (props) => {
    //View
    const [view, setView] = useState('login');
    //Login
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    //Register
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        const userPassword = localStorage.getItem('userPassword');
        const details = {
            email: userEmail,
            password: userPassword
        }
        axios.post('/api/users/login', details)
        .then(function (response) {
            props.setLoggedIn(true);
        })
    }, []);

    //Login existing user - pass
    const login = (e) => {
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
                <input onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email" name="email" value={loginEmail}></input>
                <input onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" name="password" value={loginPassword}></input>
                <button onClick={login}>Login</button>
            </div>
            }
            {view === 'register' &&
            <div className="register-container">
                <form className="input-main">
                <input onChange={(e) => setRegName(e.target.value)} placeholder="Name" name="name" value={regName}></input>
                <input onChange={(e) => setRegEmail(e.target.value)} placeholder="Email" name="email" value={regEmail}></input>
                <input onChange={(e) => setRegPassword(e.target.value)} placeholder="Password" name="password" value={regPassword}></input>
                <button onClick={register}>Register</button>
                </form>
            </div>
            }
        </div>
    )
}

export default LoginForm