import { Routes, Route } from "react-router-dom"
import DexaInvitation from "./Pages/Dexa-Invitation"
import { GuestWA } from "./Pages/Blast"
import InvitationPage from "./Pages/InvitationPage"
import InvitationForm from "./Pages/InvitationForm"



function App() {

  return (
    <Routes>
      <Route path="/" element={<DexaInvitation />} />
      <Route path="/blast" element={<GuestWA />} />
      <Route path="/FormInput" element={<InvitationForm  />} />
      <Route path="/:slug/:guest?" element={<InvitationPage />} />
    </Routes>
  )
}

export default App