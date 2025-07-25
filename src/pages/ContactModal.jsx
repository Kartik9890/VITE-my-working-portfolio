import React from 'react';
import Modal from 'react-modal';
import './ContactModal.css';

Modal.setAppElement('#root');

const ContactModal = ({ isOpen, onRequestClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (mock)');
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Contact Me</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input type="text" name="user_name" placeholder="Your Name" required />
        <input type="email" name="user_email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit" className="btn">Send Message</button>
      </form>
      <button className="btn outline close-btn" onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ContactModal;
