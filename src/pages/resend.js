import { useState } from "react"
import LoginBackground from "../components/loginbackground"
import { auth } from '../firebase';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const Resend = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleResend = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified === true) {
                setError("Email already verified!")
                return;
            }
            sendEmailVerification(user).then(() => {
                alert("Verification email sent! Check your mailbox!")
                navigate("/login")
            })
        })
        .catch((error) => {
            if (error.code === 'auth/invalid-email') {
                setError('Invalid email address!');
            } else if (error.code === 'auth/user-not-found') {
                setError('User not found!');
            } else if (error.code === 'auth/invalid-login-credentials') {
                setError('Wrong credentials!');
            } else {
                setError(error.code);
            }
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        navigate("/login")
    }

    return (
        <div>
            <LoginBackground />
            <div className="position-absolute d-flex flex-row m-0" 
            style={{height:"100%", width: "90%", left: "5%", top: "0", zIndex: "0", animation: "fadeIn 0.5s"}}>
                <div className='position-relative col-xl-3 col-lg-5 col-md-6 col-8 mx-auto border rounded' style={{height: "56%", top: "22%", backgroundColor: "white"}}>
                    <form 
                        onSubmit={handleResend} 
                        className='container d-flex flex-column p-sm-3'>
                        <img 
                            src="https://cdn.discordapp.com/attachments/1148952235431178302/1170672051296677998/WhatsApp_Image_2023-11-01_at_21.25.28_ed920a72-removebg-preview.png?ex=6559e44f&is=65476f4f&hm=4647a13008ce64a7f147a035dd7e29372e25dace5b6da8fdb3e1077d219042f6&" 
                            alt="logo" 
                            className='mx-auto'
                            height={100}
                            width={100} />
                        <h5 className='text-center mb-sm-4 pt-sm-3'>Resend Verification Email</h5>
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
                            placeholder="Enter password"
                            onChange={(e) => {setPassword(e.target.value); setError(null)}}
                            required />
                        <button 
                            type="submit" 
                            className='btn btn-primary mb-3 mx-auto rounded-pill shadow' >
                            Submit
                        </button>
                        <span className='text-danger mx-auto'>{error}</span>
                        <div className='text-center text-secondary'>
                            Back to
                            <span 
                                className='text-primary px-1' 
                                onClick={(e) => {handleClick(e)} }
                                style={{cursor: "pointer"}} >
                            Login
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
  
export default Resend