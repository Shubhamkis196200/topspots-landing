import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import VenuesLanding from './pages/VenuesLanding'
import StaffLanding from './pages/StaffLanding'
import Marketplace from './pages/Marketplace'
import MarketplaceDemo from './pages/MarketplaceDemo'
import MarketplaceStaffView from './pages/MarketplaceStaffView'
import MarketplaceVenueView from './pages/MarketplaceVenueView'
import StaffDesignA from './pages/StaffDesignA'
import StaffDesignB from './pages/StaffDesignB'
import VenueDesignA from './pages/VenueDesignA'
import VenueDesignB from './pages/VenueDesignB'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/venues" element={<VenuesLanding />} />
      <Route path="/staff" element={<StaffLanding />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/marketplace/demo" element={<MarketplaceDemo />} />
      <Route path="/marketplace/staff" element={<MarketplaceStaffView />} />
      <Route path="/marketplace/venue" element={<MarketplaceVenueView />} />
      <Route path="/design-v3/staff-a" element={<StaffDesignA />} />
      <Route path="/design-v3/staff-b" element={<StaffDesignB />} />
      <Route path="/design-v3/venue-a" element={<VenueDesignA />} />
      <Route path="/design-v3/venue-b" element={<VenueDesignB />} />
    </Routes>
  )
}
