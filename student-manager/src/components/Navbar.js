
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";

function Navbar() {
    var user = useSelector(store=>store.auth.user);
    const dispatch = useDispatch ();
    const navigate= useNavigate();
    function logout(){
        if(user){
            axios.post('http://localhost:8008/auth/login',{
                headers:{'Authorization':"Bearer "+ user.jwt}
            });
            dispatch(removeUser());
            navigate('/login');
        }
    }
    return <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="navbar-brand">
            <h4>Student Log</h4>
        </div>
        <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
        className="collapse navbar-collapse mr-auto"
        id="navbarNav"
        style={{ float: "left" }}
        >
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
  {user ? (
  <>
    <li className="nav-item">
      <NavLink to={"/students"} className="nav-link">
        List of Students
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink to={"/addstudent"} className="nav-link">
        Add Student
      </NavLink>
    </li>
  </>
) : (
  <>
      <li className="nav-item">
      <NavLink to={"/"} className="nav-link">
          Home
      </NavLink>
      </li>
     
     <li className="nav-item">
      <NavLink to={"/register"} className="nav-link">
          Register
      </NavLink>
    </li>
  
</>
)
}

                
                {user?
                <li className="nav-item">
                <span className="nav-link" onClick={logout}style={{ cursor: 'pointer' }}>Logout</span>
       </li>:
                <li className="nav-item">
                <NavLink 
                to={"/login"} 
                className={
                    'nav-link '+
                    (status => status.isActive ? 'active' : '')
                } 
                >
                    Login
                </NavLink>
                </li>
            }
            </ul>
        </div>
    </nav>;
}

export default Navbar;