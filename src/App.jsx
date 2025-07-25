import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ContactModal from './pages/ContactModal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openContactModal = () => setModalOpen(true);
  const closeContactModal = () => setModalOpen(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home openContactModal={openContactModal} />} />
        <Route path="/projects" element={<Projects />} />
        {/* No /contact route here */}
      </Routes>

      {/* Modal rendered outside routes */}
      <ContactModal isOpen={modalOpen} onRequestClose={closeContactModal} />
    </Router>
  );
}

export default App;
