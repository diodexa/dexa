import './App.css'
import { Catalogue } from './Components/Section/Catalogue'
import { Feature } from './Components/Section/Feature'
import { Footer } from './Components/Section/footer'
import { Hero } from './Components/Section/Hero'
import { Navbar } from './Components/Section/Navbar'
import { NamaTamu } from './Components/Section/NamaTamu'
import { FAQ } from './Components/Section/FAQs'
import { WhatsappButton } from './Components/Section/WhatsappButton'
import { useEffect, useState } from 'react'

function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(()=>{
    const sections = document.querySelectorAll("div[id]"); 

    const observer = new IntersectionObserver((enteries)=> {
      enteries.forEach((entry)=>{
        if(entry.isIntersecting){
          console.log("Aktif:", entry.target.id);
          setActiveSection(entry.target.id)
        }
      });
    }, { threshold: 0.5 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  },[])
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      <Navbar activeSection={activeSection} />
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
