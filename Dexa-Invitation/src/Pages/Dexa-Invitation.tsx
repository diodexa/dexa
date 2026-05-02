import { Footer } from '../Components/footer';
import { Navbar } from '../Components/Navbar';
import { Catalogue } from '../Components/Section/Catalogue';
import { FAQ } from '../Components/Section/FAQs';
import { Feature } from '../Components/Section/Feature';
import { Hero } from '../Components/Section/Hero';
import { NamaTamu } from '../Components/Section/NamaTamu';
import { WhatsappButton } from '../Components/WhatsappButton';
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
