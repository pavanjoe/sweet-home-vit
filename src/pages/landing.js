import Footer from "../components/Footer";
import Options from "../components/Options";
import Nav from "../components/Nav";
import AboutUs from "../components/AboutUs";
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../context/authContext';

function LandingPage () {
    const {currentUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleGetStarted = (e) => {
        e.preventDefault();
        currentUser ? navigate('/home') : navigate('/signup');
    }

    return (
        <div className="landing-page">
            <Nav />
            <div className="content">
                <div className="col-xl-7 col-12">
                    <h1 className="text-center py-5">Welcome to SweetHome!</h1>
                    <div className="px-sm-5 px-1">
                        <center>
                        <h3>At Planify, we simplify your busy life. Our user-friendly platform empowers you to effortlessly create, organize, and manage tasks, helping you stay in control of your time and productivity. 
                            Say goodbye to to-do list chaos and embrace a more organized, productive you. 
                            Get started with Planify today and seize control of your schedule! Join us now!
                        </h3>
                        <button className="start mt-2 mb-5" onClick={(e) => {handleGetStarted(e)}}>Get Started</button>
                        </center>
                    </div>
                </div>
            </div>
            <div className="content-small"></div> 
            <Options />
            <AboutUs />
            <Footer />
        </div>
    );
}

export default LandingPage;