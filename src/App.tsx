import { Routes, Route, Navigate } from 'react-router-dom'
import VenuesLanding from './pages/VenuesLanding'
import StaffLanding from './pages/StaffLanding'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/venues" replace />} />
      <Route path="/venues" element={<VenuesLanding />} />
      <Route path="/staff" element={<StaffLanding />} />
    </Routes>
  )
}
