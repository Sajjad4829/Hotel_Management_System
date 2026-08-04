import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import FacilitiesPage from './Components/Facility/Facility'
import RoomsPage from './Components/Roompage/Rooms'
import RoomDetails from './Components/RoomDetails/RoomDetails'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'
import BookingPage from './Components/BookingPage/Booking'
import SearchResultWrapper from './Components/SearchResults/SearchResultWrapper'
//import HotelDetails from "./Components/OfferHotelDetails/HotelDetails";
import SearchHotelDetails from "./Components/SearchResultDetails/SearchHotelDetails";
import RoomSelection from './Components/RoomselectionFolder/Roomselection'
import AIAssistant from './Components/AI_Assistent/Aiassistant'
import OffersPage from './Components/OfferPage/OffersPage'
import OfferDetails from './Components/OfferDetails/OfferDetails'
import Login from './Components/LoginPage/Login'
import Register from './Components/RegisterPage/Register'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import Dashboard from './Components/MainDashBoard/DashBoard/dashboard'
import RoomManagement from './Components/MainDashBoard/Pages/Room_Management/RoomManagement'
import RoomCategories from './Components/MainDashBoard/Pages/Room_Management/RoomCategories'
import PublicLayout from './Components/PublicLayout.jsx'
import DashboardRoute from './Components/DashboardRoute.jsx'
import DestinationDetails from './Components/DestinationDetails/DestinationDetails'
import { PageProvider } from './Context/PageContext.jsx'
import ContentManagerWrapper from './Components/MainDashBoard/Pages/Content/ContentManagerWrapper.jsx'
import HeroWrapper from './Components/MainDashBoard/Pages/Appearance/HeroWrapper.jsx'
import NavbarWrapper from './Components/MainDashBoard/Pages/Appearance/NavbarWrapper.jsx'
import Destinations from './Components/MainDashBoard/Pages/Property_Management/Destinations.jsx'
import Hotels from './Components/MainDashBoard/Pages/Property_Management/Hotels.jsx'
import Offers from './Components/MainDashBoard/Pages/Marketing_Management/Offers.jsx'
import LocationsPage from './Components/Locations/LocationsPage.jsx'
import HotelContactSection from './Components/Contact/Contact.jsx'
import Gallery from './Components/Gallery/Gallery.jsx'
import { RoomProvider } from './Context/RoomContext.jsx'
import { PropertyProvider } from './Context/PropertyContext.jsx'

function App() {
  return (
    <PropertyProvider>
      <PageProvider>
        <RoomProvider>
          <div className="min-h-screen bg-stone-50 overflow-x-hidden">
            <ScrollToTop />
          <AIAssistant />
          <Routes>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="/facility" element={<FacilitiesPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/rooms/:id" element={<RoomDetails />} />
              <Route path="/book/:id" element={<BookingPage />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/search-results" element={<SearchResultWrapper />} />
              <Route path="/hotel/:id" element={<SearchHotelDetails />} />
              <Route path="/hotel/:id/rooms" element={<RoomSelection />} />
              <Route path="/destination/:id" element={<DestinationDetails />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/locations" element={<LocationsPage />} />
              <Route path="/contact" element={<HotelContactSection />} />
              <Route path="/offers/:id" element={<OfferDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            <Route element={<DashboardRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/destinations" element={<Destinations />} />
              <Route path="/dashboard/hotels" element={<Hotels />} />
              <Route path="/dashboard/rooms" element={<RoomManagement />} />
              <Route path="/dashboard/rooms/categories" element={<RoomCategories />} />
              <Route path="/dashboard/offers" element={<Offers />} />
              <Route path="/dashboard/appearance/hero" element={<HeroWrapper />} />
              <Route path="/dashboard/appearance/navbar" element={<NavbarWrapper />} />
              <Route path="/dashboard/content/:page" element={<ContentManagerWrapper />} />
            </Route>
          </Routes>
        </div>
        </RoomProvider>
      </PageProvider>
    </PropertyProvider>
  )
}

export default App
