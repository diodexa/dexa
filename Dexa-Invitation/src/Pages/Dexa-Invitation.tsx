import { Footer } from '../Components/Dashboard/footer';
import { Navbar } from '../Components/Dashboard/Navbar';
import { Catalogue } from '../Components/Dashboard/Catalogue';
import { FAQ } from '../Components/Dashboard/FAQs';
import { Feature } from '../Components/Dashboard/Feature';
import { Hero } from '../Components/Dashboard/Hero';
import { NamaTamu } from '../Components/Dashboard/NamaTamu';
import { WhatsappButton } from '../Components/Blastes/WhatsappButton';
import { useEffect, useState } from 'react'

function DexaInvitation() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(()=>{
    const sections = document.querySelectorAll("div[id]"); 
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
    <>
      
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


    </>

    
  )
}

export default DexaInvitation
