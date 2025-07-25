import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import Home from './pages/Home';
import Projects from './pages/Projects';
import ContactPopup from './pages/ContactPopup';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContactPopup = () => setIsContactOpen(true);
  const closeContactPopup = () => setIsContactOpen(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home openContactPopup={openContactPopup} />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>

      <ContactPopup isOpen={isContactOpen} onClose={closeContactPopup} />
    </>
  );
}

export default App;
