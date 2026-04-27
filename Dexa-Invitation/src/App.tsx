import './App.css'
import { Catalogue } from './Components/Catalogue'
import { Feature } from './Components/Feature'
import { Footer } from './Components/footer'
import { Hero } from './Components/Hero'
import { Navbar } from './Components/Navbar'
import { NamaTamu } from './Components/NamaTamu'

function App() {

  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      <Navbar/>
      <div className='mt-25'>
        <Hero/>
        <NamaTamu/>
        <Feature/>
        <Catalogue/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
