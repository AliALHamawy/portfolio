import { useEffect } from 'react';
import { Header, Hero, Main, Contact, Footer } from './components/index2.jsx';
import { useState } from 'react';

function App() {

  const [showScrollBTN, setshowScrollBTN] = useState(false); // Moved before useEffect

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setshowScrollBTN(true)
      }
      else {
        setshowScrollBTN(false)
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []); // Dependencies are now correct
  return (

    <div id='up' className='container'>
      <Header />
      <div className='divider f-divider' />
      <Hero />
      <div className='divider' />
      <Main />
      <div className='divider' />
      <Contact />
      <div className='divider' />
      <Footer />
      {showScrollBTN && (
        <a href="#up"><button className="scroll2top icon-keyboard_arrow_up"></button></a>)}
    </div>
  )
}

export default App
