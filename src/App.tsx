import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import VenuesLanding from './pages/VenuesLanding'
import StaffLanding from './pages/StaffLanding'
import Marketplace from './pages/Marketplace'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/venues" element={<VenuesLanding />} />
      <Route path="/staff" element={<StaffLanding />} />
      <Route path="/marketplace" element={<Marketplace />} />
    </Routes>
  )
}
