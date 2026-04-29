import './App.css'
import { Catalogue } from './Components/Catalogue'
import { Feature } from './Components/Feature'
import { Footer } from './Components/footer'
import { Hero } from './Components/Hero'
import { Navbar } from './Components/Navbar'
import { NamaTamu } from './Components/NamaTamu'
import { FAQ } from './Components/FAQs'
import { WhatsappButton } from './Components/WhatsappButton'
import { useEffect, useState } from 'react'

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(()=>{
    const sections = document.querySelectorAll("section[id]"); 

    const observer = new IntersectionObserver((enteries)=> {
      enteries.forEach((entry)=>{
        if(entry.isIntersecting){
          setActiveSection(entry.target.id)
        }
      });
    }, { threshold: 0.5 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  },[])
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      <Navbar/>
      <div className='mt-25'>
        <Hero/>
        <NamaTamu/>
        <Feature/>
        <Catalogue/>
        <FAQ/>
        <WhatsappButton/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
