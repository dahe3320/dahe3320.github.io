import './App.css'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Galleries from './components/Galleries';
import About from './components/About'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<><Hero /><Gallery /><About /></>} /> {/* Gallery route */}
        <Route path="/project/:id" element={<Galleries />} /> {/* ProjectPage route */}
      </Routes>
      <Footer />
    </>
  )
}

export default App;
