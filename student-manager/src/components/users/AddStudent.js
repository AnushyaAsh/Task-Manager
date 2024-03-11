import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth"
import { useSelector } from "react-redux";

function AddStudent() {
    var user = useSelector(store=>store.auth.user);
    const [name, setName] = useState('');
    const [standard, setStandard] = useState('');
    const [dob, setDob] = useState('');
    const [guardianname, setGuardianname] = useState('');
    const [address, setAddress] = useState('');
    var navigate = useNavigate()
    function addStudent() {
        axios.post('http://localhost:8008/addstudent',
        {
            name: name,
            standard: standard,
            dob: dob,
            guardianname: guardianname,
            address: address,
        },
        {
            headers:{'Authorization':"Bearer "+ user.jwt}
        }
        ).then(response => { 
            console.log('Response:', response.data);
            navigate('/students');
        }).catch(error => {
            console.error('Error adding student:', error);
        });
    }
    return (<div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Add Student</h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Standard:</label>
                        <textarea 
                        className="form-control" 
                        value={standard} 
                        onChange={(event)=>{setStandard(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>DOB:</label>
                        <input 
                        type="number" 
                        className="form-control" 
                        value={dob} 
                        onChange={(event)=>{setDob(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Guardian Name:</label>
                        <input 
                        type="date" 
                        className="form-control" 
                        value={guardianname} 
                        onChange={(event)=>{setGuardianname(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Address:</label>
                        <input 
                        type="date" 
                        className="form-control" 
                        value={address} 
                        onChange={(event)=>{setAddress(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={addStudent}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default checkAuth(AddStudent);