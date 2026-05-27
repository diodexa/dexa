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

  useEffect(() => {

    const handleScroll = () => {
      const sections = document.querySelectorAll("div[id]");;
      let currentSection = "";

      sections.forEach((section) => {
        const rect =section.getBoundingClientRect();
         if (rect.top <= 200 &&rect.bottom >= 200) {
          currentSection = section.id;}

      });
      console.log(currentSection)

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
