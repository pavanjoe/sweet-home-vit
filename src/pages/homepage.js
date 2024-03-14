import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {useState} from "react";
import "../styles/HomePage.css";
import PopUpComponent from './PopUpComponent';

const Homepage = () => {

  const [show, setShow] = useState(false);


  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

    return (
        <>
          <Nav />
          <h6 className="centered-content">
            Click on the button to get started!
          </h6>
          <button onClick={handleShow} className="bottom-right-button m-3">+</button>
          <PopUpComponent show={show} handleClose={handleClose} />
          <Footer />
        </>
      );
    };
    
    export default Homepage;
