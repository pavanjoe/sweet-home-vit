import '../styles/Options.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../context/authContext';

function Options() {
  const {currentUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    currentUser ? navigate('/home') : navigate('/signup');
}

  return (
    <div className="options-container d-flex flex-row flex-wrap">
      <div className='card-wrapper col-lg-3 col-sm-6 col-12 my-2'>
        <div class="card text-center m-1">
          <i class="fas fa-hand-peace"></i>
          <div class="card-body">
              <h5 class="card-title">Balance and Harmony</h5>
              <p class="card-text">SweetHome designs serene bedrooms using Feng Shui principles. Share your preferences for a tranquil space tailored to you.</p>
              <button className='btn' onClick={(e) => {handleGetStarted(e)}}>Get Started</button>
          </div>
        </div>
      </div>
      <div className='card-wrapper col-lg-3 col-sm-6 col-12 my-2'>
        <div class="card text-center m-1">
          <i class="fas fa-bed"></i>
          <div class="card-body">
              <h5 class="card-title">Customized Bedroom Design</h5>
              <p class="card-text">SweetHome offers tailored bedroom designs to match users' tastes. From bed types to color schemes, users can visualize their ideal bedroom layout effortlessly</p>
          </div>
        </div>
      </div>
      <div className='card-wrapper col-lg-3 col-sm-6 col-12 my-2'>
        <div class="card text-center m-1">
          <i class='fas fa-users'></i>
          <div class="card-body">
              <h5 class="card-title">Your Style, Your Space</h5>
              <p class="card-text">SweetHome lets you customize themes and furniture to match your unique style. From minimalist to cozy, create a bedroom that reflects your personality effortlessly</p>
          </div>
        </div>
      </div>
      <div className='card-wrapper col-lg-3 col-sm-6 col-12 my-2'>
        <div class="card text-center m-1">
          <i class="fas fa-phone"></i>
          <div class="card-body">
              <h5 class="card-title">Contact Us</h5>
              <p class="card-text">Need help or have a question? Our contact us card is your direct line to our friendly team – get in touch, and we'll be delighted to assist you!</p>
              <button className='btn' onClick={() => {navigate("/contact")}}>Contact Us</button>
          </div>
        </div>                  
      </div>
    </div>
  );
}

export default Options;
