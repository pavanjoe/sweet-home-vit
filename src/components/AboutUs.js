/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import '../styles/AboutUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'; 
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'; 
library.add(faLinkedin, faGithub, faTwitter); 

function AboutUs() {
  const [isAboutUsVisible, setIsAboutUsVisible] = useState(false);
  const aboutUsRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (aboutUsRef.current) {
        const aboutUsTop = aboutUsRef.current.getBoundingClientRect().top;
        const windowBottom = window.innerHeight;

        if (aboutUsTop < windowBottom) {
          setIsAboutUsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='about-us pb-5 p-2'>
      <h2 className='header text-center mt-5'>We Are Team-08</h2>
      <div
        className={`centered-div fade-in-element ${isAboutUsVisible ? 'visible' : ''} d-flex flex-row flex-wrap justify-content-center align-items-center`}
        ref={aboutUsRef}
      >
        <div className="team-members col-lg-3 col-md-6 col-12 order-md-0 order-2">
          <table>
            <tbody>
                <tr>
                <td>Dhanush Baalaji</td>
                <td><a href="https://github.com/Realitylion"><FontAwesomeIcon icon={faGithub} /> </a></td>
                <td><a href="https://www.linkedin.com/in/dhanush-baalaji-k-719849233/"><FontAwesomeIcon icon={faLinkedin} /></a></td>
                </tr>
                <tr>
                <td>Pavan Joe Augustine</td>
                <td><a href="https://github.com/pavanjoe"><FontAwesomeIcon icon={faGithub} /> </a></td>
                <td><a href="https://www.linkedin.com/in/pavan-joe-2064a8217/"><FontAwesomeIcon icon={faLinkedin} /></a></td>
                </tr>
                <tr>
                <td>Tejus Cherian Sujith</td>
                <td><a href="https://github.com/Raven2099"><FontAwesomeIcon icon={faGithub} /> </a></td>
                <td><a href="https://www.linkedin.com/in/tejus-cs-7babb6264"><FontAwesomeIcon icon={faLinkedin} /></a></td>
                </tr>
                <tr>
                <td>Ananya Garg</td>
                <td><a href="https://github.com/ananya1262"><FontAwesomeIcon icon={faGithub} /> </a></td>
                <td><a href="https://www.linkedin.com/in/ananya-garg194a12215/"><FontAwesomeIcon icon={faLinkedin} /></a></td>
                </tr>
                <tr>
                <td>Vishnu Sunil Kumar</td>
                <td><a href="https://github.com/vsk387"><FontAwesomeIcon icon={faGithub} /> </a></td>
                <td><a href="https://www.linkedin.com/in/vishnu-sunil-kumar-395472237"><FontAwesomeIcon icon={faLinkedin} /></a></td>
                </tr>
            </tbody>
            </table>
        </div>
        <div className='col-lg-1 col-0 order-1'></div>
        <div className='team-intro col-lg-4 col-md-6 col-12 text-center order-md-2 order-0'>
          <p className='intro mt-3 mx-0'>Welcome to our team! We are a group of enthusiastic B. Tech Computer Science students from Vellore Institute of Technology, 
            Vellore. With a shared passion for technology, we have come together to create a task scheduling app that simplifies your 
            daily routines. Our goal is to provide you with an efficient and user-friendly solution to manage your tasks and time 
            effectively. Join us on this journey as we strive to make your life more organized and productive. Get connected with us here!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;