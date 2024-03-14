import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} SweetHome: Your Go-To Room Designing App</p>
      </div>
    </footer>
  );
}

export default Footer;
