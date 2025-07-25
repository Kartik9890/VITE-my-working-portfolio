import React from 'react';
import './ContactPopup.css';

const ContactPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Contact Me</h2>
        <p><strong>📞 Mobile:</strong> +91-9890597843</p>
        <p><strong>📧 Email:</strong> kartikhande123@gmail.com</p>
        <button className="btn close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ContactPopup;
