import { Routes, Route } from "react-router-dom"
import DexaInvitation from "./Pages/Dexa-Invitation"
import { GuestWA } from "./Pages/Blast"


function App() {
  return (
    <Routes>
      <Route path="/" element={<DexaInvitation />} />
      <Route path="/blast" element={<GuestWA />} />
    </Routes>
  )
}

export default App