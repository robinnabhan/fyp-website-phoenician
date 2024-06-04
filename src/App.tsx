import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import ContactUs from './Contact';

function App() {
  return (
 
  <>
  <ScrollToTop/>
  <Header/>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<ContactUs />} />

    {/* Add more routes for other pages */}
  </Routes>
  <Footer/>
  </>
  );

}

export default App;
