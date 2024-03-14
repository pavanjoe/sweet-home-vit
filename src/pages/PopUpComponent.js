import React from 'react';
import  '../styles/PopStyles.css';
import FormFill from './FormFill'
const PopUpComponent = ({ handleClose, show }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
        <button type="button" className="btn btn-outline-secondary close-button" aria-label="Close" onClick={handleClose}>
        <span aria-hidden="true">Close</span>
        </button>
          <br />
          <FormFill />
        </section>
      </div>
    );
  };
  
  export default PopUpComponent;