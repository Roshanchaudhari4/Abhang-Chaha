import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Menu from './components/Menu';
import Feedback from './components/Feedback';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Menu />
      <Feedback />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
