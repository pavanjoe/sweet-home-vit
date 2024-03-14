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
          <i class="fas fa-calendar-check"></i>
          <div class="card-body">
              <h5 class="card-title">Easy Scheduling</h5>
              <p class="card-text">Make scheduling easier by using our visual and user-friendly interface for quickly adding, arranging, and tracking tasks and appointments.</p>
              <button className='btn' onClick={(e) => {handleGetStarted(e)}}>Get Started</button>
          </div>
        </div>
      </div>
      <div className='card-wrapper col-lg-3 col-sm-6 col-12 my-2'>
        <div class="card text-center m-1">
          <i class="fas fa-tasks"></i>
          <div class="card-body">
              <h5 class="card-title">Create Task</h5>
              <p class="card-text">Embark on your productivity journey by taking the first step – create your initial task and set the pace for effective task management.</p>
          </div>
        </div>
      </div>
      <div className='card-wrapper col-lg-3 col-sm-6 col-12 my-2'>
        <div class="card text-center m-1">
          <i class='fas fa-chart-line'></i>
          <div class="card-body">
              <h5 class="card-title">Track Progress</h5>
              <p class="card-text">Monitor your progress with ease – our 'Track Progress' feature provides you with real-time insights and helps you stay on top of your goals.</p>
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
