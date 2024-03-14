import { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';
import 'css-doodle';
import LoginBackground from '../components/loginbackground';
import image from '../components/images/house.png'

const Login = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const {dispatch} = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.emailVerified === false) {
            setError("Email not verified!")
            alert("Email not verified! Check your mailbox for a verification email.")
            return;
          }
          dispatch({type:"LOGIN", payload:user})
          navigate("/home")
        })
        .catch((error) => {
          setError("Wrong credentials!");
          console.log(error.code, error.message)
        });
    }

    const handleReset = (e) => {
        e.preventDefault()
        navigate("/reset")
    }

    const handleClick = (e) => {
        e.preventDefault()
        navigate("/signup")
    }

    const handleResendMail = (e) => {
        e.preventDefault()
        navigate("/resend")
    }

    return(
        <>
            <LoginBackground />
            <div className="position-absolute d-flex flex-row m-0" 
            style={{height:"100%", width: "90%", left: "5%", top: "0", zIndex: "0", animation: "fadeIn 0.5s"}}>
                <div className='col-xl-3 col-lg-4 col-md-5 col-0'></div>
                <div className='position-relative col-xl-3 col-lg-5 col-md-5 col-10 mx-auto border rounded' style={{height: "66%", maxHeight: "500px", top: "17%", backgroundColor: "white"}}>
                    <form 
                        onSubmit={handleLogin} 
                        className='container d-flex flex-column p-1 p-sm-4'>
                        <img 
                            src={image}
                            alt="logo" 
                            className='mx-auto'
                            height={100}
                            width={100} />
                        <h5 className='text-center mb-4'>Login</h5>
                        <input
                            className='form-control mb-3 mx-auto rounded-pill border-0'
                            style={{backgroundColor: "#F5F5F5"}}
                            type="email"
                            placeholder="Enter e-mail"
                            onChange={(e) => {setEmail(e.target.value); setError(null)}}
                            required />
                        <input
                            className='form-control mb-3 mx-auto rounded-pill border-0'
                            style={{backgroundColor: "#F5F5F5"}}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {setPassword(e.target.value); setError(null)}}
                            required />
                        <span 
                            className='text-primary pb-3 text-end'
                            style={{cursor: "pointer", font: "small-caption"}} 
                            onClick={(e) => handleReset(e)} >
                            Forgot password?
                        </span>
                        <button 
                            type="submit" 
                            className='btn btn-primary mb-3 mx-auto rounded-pill shadow' >
                            Log in</button>
                        <span className='text-danger mx-auto'>{error}</span>
                        <div className='text-center text-secondary'>
                            Don't have an account? 
                            <span 
                                className='text-primary px-1' 
                                onClick={(e) => {handleClick(e)} }
                                style={{cursor: "pointer"}} >
                                <br />
                                Sign Up
                            </span>
                        </div>
                        <div className='text-center text-secondary pt-2' style={{font: "small-caption"}}>
                            <span
                                className='text-primary px-1'
                                onClick={(e) => {handleResendMail(e)}}
                                style={{cursor: "pointer"}} >
                            Click here 
                            </span>
                            to resend verification email
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
 
export default Login