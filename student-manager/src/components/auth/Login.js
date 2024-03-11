import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import {useNavigate} from "react-router-dom";
import checkGuest from "./checkGuest";

function Login() {
    
    var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function attemptLogin() {
        if (!username || !password) {
            setErrorMessage("Please enter both username and password.");
            return;
        }
        axios.post('http://localhost:8008/auth/login',{
            username:username,
            password:password
        }).then(response => {
            const { username, jwt } = response.data;
            if (username && jwt) {
                
                var userObject = {
                    username: username,
                    jwt: jwt
                };
                dispatch(setUser(userObject));
                navigate("/medicine");
            } else {
                setErrorMessage("Invalid username or password.");
            }
   
        }).catch(error => {
            if (error.response.status === 404) {
                setErrorMessage("User not found. Please register before logging in.");
            } else if (error.response.data.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(''));
            } else if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Failed to login user. Please contact admin');
            }
        });
    }
    return (<div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1>Login</h1>
                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text"
                        className="form-control"
                        value={username}
                        required
                        onInput={(event)=>setUsername(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password"
                        className="form-control"
                        value={password}
                        required
                        onInput={(event)=>setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={attemptLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}


export default checkGuest(Login);