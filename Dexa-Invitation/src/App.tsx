import './App.css'
import { Catalogue } from './Components/Catalogue'
import { Feature } from './Components/Feature'
import { Footer } from './Components/footer'
import { Hero } from './Components/Hero'
import { Navbar } from './Components/Navbar'

function App() {

  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      <Navbar/>
      <div>
        <Hero/>
        <Catalogue/>
        <Feature/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
