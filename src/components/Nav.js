import '../styles/Nav.css'
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from '../context/authContext';
import { useContext } from "react";

function Nav() {
  const {currentUser} = useContext(AuthContext);

  const {dispatch} = useContext(AuthContext)
  
  const navigate = useNavigate(); 
  
  const handleHome = () => {
    if (currentUser) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut(auth)
    .then(() => {
        dispatch({type:"LOGOUT"})
        alert("Logged out successfully");
        navigate("/");
    }).catch((error) => {
        console.log(error.code, error.message)
    });
  }

  return (
    <>
      <style>
        {`
            .navbar-toggler:focus,
            .navbar-toggler:active,
            .navbar-toggler-icon:focus {
                outline: none;
                box-shadow: none;
            }
        `}
      </style>
      <div className='nav-wrapper'>
        <nav className="navbar navbar-expand-md py-2">
          <div className='container-fluid d-flex justify-content-between'>
            <span className="navbar-brand mx-md-4 mx-0 order-0 flex-md-grow-0 flex-grow-1" onClick={() => {handleHome()}} style={{cursor: "pointer"}}>SweetHome</span>
            
            <button 
              class="navbar-toggler mx-2 bg-white" 
              type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNav" 
              aria-controls="navbarTogglerDemo03" 
              aria-expanded="false" 
              aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse order-md-1 order-2" id="navbarNav">
              <ul className="navbar-nav ml-auto d-flex align-items-start">
                <li className="nav-item">
                  <span className="nav-link mx-3" onClick={() => {handleHome()}} style={{cursor: "pointer"}}>
                    Home
                  </span>
                </li>
              </ul>
            </div>
            
            {currentUser &&
            <div className='ml-auto order-md-2 order-1'>
              <div className="btn btn-danger-logout me-4"
              onClick={(e) => {handleSignOut(e)}} >Logout</div>
            </div>
            }

            {!currentUser &&
            <div className="ml-auto order-md-2 order-1">
              <button className="btn btn-danger me-4"
              onClick={() => {navigate("/login")}} >Login</button>
            </div>
            }
          </div>
        </nav>
      </div>
    </>
  );
}

export default Nav;