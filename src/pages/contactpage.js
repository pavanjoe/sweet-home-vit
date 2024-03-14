import React, { useState } from "react";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import '../styles/ContactUs.css'; 
const Contactpage = () => {
    const[data,setData]=useState({name:"",email:"",phone:"",message:""})
    
    const handleChange=(e)=>{
        const name=e.target.name
        const value=e.target.value
        setData({...data,[name]:value})
    }

    const form = useRef();

    const sendEmail = (e) => {
    e.preventDefault();

    emailjs
     .sendForm('service_vt5zhrg', 'template_3dpr6aw', form.current, 'cvHLMLLH36YW5TXhi')
        .then((result) => {
            console.log(result.text);
            console.log("message sent");
        }, (error) => {
            console.log(error.text);
        });
    };

    return (
        <>
            <Nav />
            <div className="contact-form">
                <div className="container">
                    <form ref={form} onSubmit={sendEmail}>
                        <h1 style={{color:"#faebd7",fontSize:"40px",marginLeft:"-4px"}}>Contact <span>Us</span> </h1>
                        <br />
                        <input type="text" name="name" onChange={handleChange} value={data.name} placeholder="Enter your name" autoComplete="off" required />
                        <input type="email" name="email" onChange={handleChange} value={data.email} placeholder="Enter your email" autoComplete="off" required />
                        <input type="tel" name="phone"   onChange={handleChange} value={data.phone} placeholder="Enter your phone no." autoComplete="off" required />
                        <br />
                        <textarea name="message" rows="10" cols="40"  onChange={handleChange} value={data.message} placeholder="type your message... " autoComplete="off" required/>
                       <center> <button type="submit">Submit</button></center>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Contactpage;