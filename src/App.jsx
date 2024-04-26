import { useState } from 'react'
import './App.css'
import Template from './components/Template'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Template />
      <Footer />
    </>
  )
}

export default App;
