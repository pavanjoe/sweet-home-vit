import { useState, useEffect } from "react";
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { auth } from '../firebase';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser, signOut } from "firebase/auth";

const Profile = () => {
    const [currentUserName, setCurrentUserName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteError, setDeleteError] = useState('');

    const {dispatch} = useContext(AuthContext)

    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        const email = user.email;
        setEmail(email);
        setName("Test User");
        setCurrentUserName("Test User");
    }, []);

    const handleUserNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);

        const submitBtn = document.getElementById("username-submit-btn");
        const cancelBtn = document.getElementById("username-cancel-btn");
        
        const title = document.getElementById("title");
        if (title.innerHTML === (e.target.value).trim() + "'s Profile") {
            submitBtn.hidden = true;
            cancelBtn.hidden = true;
        } else {
            submitBtn.hidden = false;
            cancelBtn.hidden = false;
        }
    }

    const handleUserNameUpdate = (e) => {
        e.preventDefault();
            const submitBtn = document.getElementById("username-submit-btn");
            const cancelBtn = document.getElementById("username-cancel-btn");
            submitBtn.hidden = true;
            cancelBtn.hidden = true;    
        setCurrentUserName(name);
    }

    const handleUserNameCancel = (e) => {
        e.preventDefault();
        setName(currentUserName);
        const submitBtn = document.getElementById("username-submit-btn");
        const cancelBtn = document.getElementById("username-cancel-btn");
        submitBtn.hidden = true;
        cancelBtn.hidden = true;
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (newPassword !== newPasswordConfirm) {
            setPasswordError("Passwords don't match!");
            return;
        }

        var user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
            user.email,
            oldPassword
        );
        reauthenticateWithCredential(user, credential)
        .then(() => {
            updatePassword(user, newPassword)
            .then(() => {
                alert("Password updated!");
                setOldPassword('');
                setNewPassword('');
                setNewPasswordConfirm('');
                return;
            })
            .catch((error) => {
                if (error.code === 'auth/weak-password') {
                    setPasswordError("Password must be at least 6 characters long!");
                    return;
                } else {
                    setPasswordError(error.code);
                    return;
                }
            });
        })
        .catch((error) => {
            if (error.code === 'auth/wrong-password') {
                setPasswordError("Incorrect password!");
                return;
            } else {
                setPasswordError(error.code);
                return;
            }
        });
    }

    const handlePasswordCancel = (e) => {
        e.preventDefault();
        setOldPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
        setPasswordError(null);
        
        const collapse = document.getElementById("navbarToggleExternalContent");
        const btn = document.getElementsByClassName("navbar-toggler")[0];
        collapse.classList.remove("show");
        btn.classList.add("collapsed");
    }

    const handleAccountDelete = (e) => {
        e.preventDefault();
        var user = auth.currentUser;
        const credential = EmailAuthProvider.credential(
            user.email,
            deletePassword
        );
        reauthenticateWithCredential(user, credential)
        .then(() => {
            window.confirm("Are you sure you want to delete your account?") &&
            deleteUser(user)
            .then(() => {
                alert("Account deleted!");
                signOut(auth)
                .then(() => {
                    dispatch({type:"LOGOUT"})
                    navigate("/");
                }).catch((error) => {
                    console.log(error.code, error.message)
                });
                setDeletePassword('');
                return;
            })
            .catch((error) => {
                setDeleteError(error.code);
                return;
            });
        })
        .catch((error) => {
            if (error.code === 'auth/invalid-login-credentials') {
                setDeleteError("Incorrect password!");
                return;
            } else {
                setDeleteError(error.code);
                return;
            }
        });
    }

    const handleDeleteCancel = (e) => {
        e.preventDefault();
        setDeletePassword('');
        setDeleteError(null);
        
        const collapse = document.getElementById("navbarToggleExternalContent2");
        const btn = document.getElementsByClassName("navbar-toggler")[1];
        collapse.classList.remove("show");
        btn.classList.add("collapsed");
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
            <Nav />
            <div className="profile-wrapper d-flex flex-column bg-white align-items-center pb-5 pb-sm-4">
                <div className="col-lg-5 col-md-7 col-sm-9 col-11 my-3 rounded d-flex flex-column align-items-center" style={{backgroundColor: "#1f3345"}}>
                    <h1 id="title" className="mt-3 mx-0 text-center">{currentUserName}'s Profile</h1>
                    <div className="col-11 text-start text-white" style={{fontSize: "22px"}}>Profile Section</div>
                    <div className='col-11 container d-flex flex-column p-1 p-sm-4 border border-2 rounded mx-4 mb-3'>
                        
                        <div className="d-flex flex-column">
                            <div className="mb-1 ms-2 text-white" 
                            style={{fontSize: "12px", fontWeight: "bold"}}>
                                Your Name
                            </div>
                        </div>
                        <input 
                            type="text" 
                            className="form-control mb-3 mx-auto rounded-pill border-0" 
                            style={{backgroundColor: "#F5F5F5"}} 
                            value={name}
                            onChange={(e) => {handleUserNameChange(e)}}
                            maxLength={15}
                            required />
                        
                        <div className="d-flex flex-row">
                            <button 
                                id="username-submit-btn"
                                className="btn btn-warning rounded-pill mt-3 mx-auto"
                                style={{width: "40%"}}
                                onClick={(e) => {handleUserNameUpdate(e)}}
                                hidden >
                                Update
                            </button>
                            <button
                                id="username-cancel-btn"
                                className="btn btn-white bg-white rounded-pill border mt-3 mx-auto"
                                style={{width: "40%"}}
                                onClick={(e) => {handleUserNameCancel(e)}}
                                hidden >
                                Cancel
                            </button>
                        </div>
                        
                        <div className="d-flex flex-column">
                            <div className="mt-3 mb-1 ms-2 text-white" 
                            style={{fontSize: "12px", fontWeight: "bold"}}>
                                Email
                            </div>
                        </div>
                        <input
                            className='form-control mb-3 mx-auto rounded-pill border-0'
                            style={{backgroundColor: "#F5F5F5", color: "#999999"}}
                            type="email"
                            placeholder="Enter e-mail"
                            value={email}
                            disabled />

                        <div className="d-flex flex-column">
                            <div className="mt-3 mb-1 ms-2 text-white"
                            style={{fontSize: "12px", fontWeight: "bold"}}>
                                Phone Number
                            </div>
                        </div>
                        <input
                            className='form-control mx-auto rounded-pill border-0'
                            style={{backgroundColor: "#F5F5F5", color: "#111111"}}
                            type="tel"
                            placeholder="Enter phone number"
                            disabled />
                        
                    </div>
                    <div className="col-11 text-start text-white" style={{fontSize: "22px"}}>Account Settings</div>
                    <div className='col-11 container d-flex flex-column p-1 p-sm-4 border border-2 rounded mx-4 mb-3'>
                        <nav class="navbar">
                            <div class="container-fluid">
                                <span class="navbar-text text-white">
                                    Change Password
                                </span>

                                <button 
                                    class="navbar-toggler bg-warning" 
                                    type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarToggleExternalContent" 
                                    aria-controls="navbarToggleExternalContent" 
                                    aria-expanded="false" 
                                    aria-label="Toggle navigation" 
                                    style={{fontSize: "16px"}} >
                                    Change
                                </button>
                            </div>
                        </nav>
                        <div class="collapse" id="navbarToggleExternalContent">
                            <form onSubmit={(e) => {handlePasswordChange(e)}}>
                                <input 
                                    type="password" 
                                    className="form-control mb-3 mx-auto rounded-pill border-0" 
                                    style={{backgroundColor: "#F5F5F5"}} 
                                    value={oldPassword}
                                    onChange={(e) => {setOldPassword(e.target.value); setPasswordError(null)}}
                                    placeholder="Enter old password"
                                    required />

                                <input
                                    className='form-control mb-3 mx-auto rounded-pill border-0'
                                    style={{backgroundColor: "#F5F5F5"}}
                                    type="password"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => {setNewPassword(e.target.value); setPasswordError(null)}}
                                    required />

                                <input
                                    className='form-control mb-3 mx-auto rounded-pill border-0'
                                    style={{backgroundColor: "#F5F5F5"}}
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={newPasswordConfirm}
                                    onChange={(e) => {setNewPasswordConfirm(e.target.value); setPasswordError(null)}}
                                    required />

                                <div className="d-flex flex-row">
                                    <button 
                                        type="submit"
                                        className="btn btn-warning rounded-pill mt-3 mx-auto"
                                        style={{width: "40%"}} >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-white bg-white rounded-pill border mt-3 mx-auto"
                                        style={{width: "40%"}}
                                        onClick={(e) => {handlePasswordCancel(e)}} >
                                        Cancel
                                    </button>
                                </div>

                                <div className="error-message text-danger text-center mt-3">
                                    {passwordError}
                                </div>
                            </form>
                        </div>

                        <nav class="navbar">
                            <div class="container-fluid">
                                <span class="navbar-text text-white">
                                    Delete Account
                                </span>

                                <button 
                                    class="navbar-toggler bg-danger" 
                                    type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarToggleExternalContent2" 
                                    aria-controls="navbarToggleExternalContent2" 
                                    aria-expanded="false" 
                                    aria-label="Toggle navigation" 
                                    style={{fontSize: "16px"}} >
                                    Delete
                                </button>
                            </div>
                        </nav>
                        <div class="collapse" id="navbarToggleExternalContent2">
                            <form onSubmit={(e) => {handleAccountDelete(e)}}>
                                <input 
                                    type="password" 
                                    className="form-control mb-3 mx-auto rounded-pill border-0" 
                                    style={{backgroundColor: "#F5F5F5"}} 
                                    value={deletePassword}
                                    onChange={(e) => {setDeletePassword(e.target.value); setDeleteError(null)}}
                                    placeholder="Enter password"
                                    required />

                                <div className="d-flex flex-row">
                                    <button 
                                        type="submit"
                                        className="btn btn-danger rounded-pill mt-3 mx-auto"
                                        style={{width: "40%"}} >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-white bg-white rounded-pill border mt-3 mx-auto"
                                        style={{width: "40%"}}
                                        onClick={(e) => {handleDeleteCancel(e)}} >
                                        Cancel
                                    </button>
                                </div>

                                <div className="error-message text-danger text-center mt-3">
                                    {deleteError}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Profile