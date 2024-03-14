import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import LoginBackground from "../components/loginbackground"
import image from "../components/images/house.png"
const Signup = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if(password !== passwordCheck){
            setError("Passwords don't match!")
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sendEmailVerification(userCredential.user).then(() => {
                alert("Verification email sent! Check your mailbox!");
                navigate("/login")
            })
        })
        .catch((error) => {
          console.log(error.message)
          if (error.code === 'auth/email-already-in-use') {
            setError('Email address taken!');
          } else if (error.code === 'auth/invalid-email') {
            setError('Invalid email address!');
          } else if (error.code === 'auth/weak-password') {
            setError('Weak password!');
          } else {
            setError(error.code);
          }
        });
    }

    const handleClick = () => {
        navigate("/login")
    }

    return(
        <>
            <LoginBackground />
            <div className="position-absolute d-flex flex-row m-0" 
            style={{height:"100%", width: "90%", left: "5%", top: "0", zIndex: "0", animation: "fadeIn 0.5s"}}>
                <div className='position-relative col-xl-3 col-lg-5 col-md-5 col-10 mx-auto border rounded' style={{height: "66%", maxHeight: "500px", top: "17%", backgroundColor: "white"}}>
                    <form 
                        onSubmit={handleSignup} 
                        className='container d-flex flex-column p-1 p-sm-4'>
                        <img 
                            src={image} 
                            alt="logo" 
                            className='mx-auto'
                            height={100}
                            width={100} />
                        <h5 className='text-center mb-4'>Sign Up</h5>
                        <input
                            className='form-control mb-3 mx-auto rounded-pill border-0'
                            style={{backgroundColor: "#F5F5F5"}}
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => {setEmail(e.target.value); setError(null)}}
                            required />
                        <input
                            className='form-control mb-3 mx-auto rounded-pill border-0'
                            style={{backgroundColor: "#F5F5F5"}}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {setPassword(e.target.value); setError(null)}}
                            required />
                        <input
                            className='form-control mb-3 mx-auto rounded-pill border-0'
                            style={{backgroundColor: "#F5F5F5"}}
                            type="password"
                            placeholder="Confirm password"
                            onChange={(e) => {setPasswordCheck(e.target.value); setError(null)}}
                            required />
                        <button 
                            type="submit" 
                            className='btn btn-primary mb-3 mx-auto rounded-pill shadow' >
                            Sign Up</button>
                        {error && <span className='text-danger mx-auto'>{error}</span>}
                        <div className='text-center text-secondary'>
                            Already have an account? 
                            <span 
                                className='text-primary px-1' 
                                onClick={(e) => {handleClick()} }
                                style={{cursor: "pointer"}} >
                            Login
                            </span>
                        </div>
                    </form>
                </div>
                <div className='col-xl-3 col-lg-4 col-0'></div>
            </div>
        </>
    )
}
 
export default Signup