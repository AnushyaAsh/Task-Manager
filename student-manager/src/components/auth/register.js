import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {
     var [username, setUsername] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    function validate(){
        var password=document.getElementById("password").value
			var confirmPassword=document.getElementById("confirmPassword").value
       
    if (!username || !password || !confirmPassword) {
        setErrorMessage("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        setErrorMessage("Password and confirm password do not match.");
        return;
    }
    else{
         registerUser()
        }
    }
    function registerUser(){
        var user = {
            username: username,
            password: password,
        }
        
        axios.post('http://localhost:8008/auth/register',user).then(response=>{
            setErrorMessage('');
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Please enter the details');
            }
        })
    }
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1>Register</h1>
                    {errorMessage?<div className="alert alert-danger">{errorMessage}</div>:''}
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text"
                        className="form-control"
                        value={username}
                        onInput={(event)=>setUsername(event.target.value)}
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>Email:</label>
                        <input type="text"
                        className="form-control"
                        value={email}
                        onInput={(event)=>setEmail(event.target.value)}
                        />
                    </div> */}
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password"
                         id="password" 
                        className="form-control"
                        value={password}
                        onInput={(event)=>setPassword(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input type="password"
                         id="confirmPassword" 
                        className="form-control"
                        // value={passwordConf}
                        // onInput={(event)=>setPasswordConf(event.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={validate}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    	
}

export default Register;