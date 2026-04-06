import './App.css'
import { Card } from './Components/Card'
import { Catalogue } from './Components/Catalogue'
import { Hero } from './Components/Hero'
import { Navbar } from './Components/Navbar'

function App() {

  return (
    <>
      <Navbar/>
      <Hero/>
      <Catalogue/>
      <Card/>
    </>
  )
}

export default App
