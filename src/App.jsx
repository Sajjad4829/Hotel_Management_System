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
import Amenities from './Components/MainDashBoard/Pages/Property_Management/Amenities.jsx'
import Offers from './Components/MainDashBoard/Pages/Marketing_Management/Offers.jsx'
import HotelContactSection from './Components/Contact/Contact.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import UserDashboard from './Components/UserDashboard/UserDashboard.jsx'
import AdminBookings from './Components/MainDashBoard/Pages/Booking_Management/AdminBookings.jsx'

import Gallery from './Components/Gallery/Gallery.jsx'
import { RoomProvider } from './Context/RoomContext.jsx'
import { PropertyProvider } from './Context/PropertyContext.jsx'

function App() {
  return (
    <AuthProvider>
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
                
                {/* Booking Execution URLs - Auth check occurs when user confirms reservation */}
                <Route path="/book/:id" element={<BookingPage />} />
                <Route path="/book" element={<BookingPage />} />
                
                <Route path="/search-results" element={<SearchResultWrapper />} />
                <Route path="/hotel/:id" element={<SearchHotelDetails />} />
                <Route path="/hotel/:id/rooms" element={<RoomSelection />} />
                <Route path="/destination/:id" element={<DestinationDetails />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<HotelContactSection />} />

                <Route path="/offers/:id" element={<OfferDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Customer Portal Routes */}
                <Route path="/customer/dashboard" element={<ProtectedRoute adminOnly={false}><UserDashboard activeTab="dashboard" /></ProtectedRoute>} />
                <Route path="/customer/bookings" element={<ProtectedRoute adminOnly={false}><UserDashboard activeTab="bookings" /></ProtectedRoute>} />
                <Route path="/customer/bookings/:id" element={<ProtectedRoute adminOnly={false}><UserDashboard activeTab="bookings" /></ProtectedRoute>} />
                <Route path="/customer/profile" element={<ProtectedRoute adminOnly={false}><UserDashboard activeTab="profile" /></ProtectedRoute>} />
                <Route path="/customer/wishlist" element={<ProtectedRoute adminOnly={false}><UserDashboard activeTab="wishlist" /></ProtectedRoute>} />
                <Route path="/customer/settings" element={<ProtectedRoute adminOnly={false}><UserDashboard activeTab="settings" /></ProtectedRoute>} />
                {/* Legacy redirect support */}
                <Route path="/customer/*" element={<ProtectedRoute adminOnly={false}><UserDashboard activeTab="dashboard" /></ProtectedRoute>} />
              </Route>

              {/* Protected Route exclusively for admin users at /dashboard */}
              <Route element={<ProtectedRoute adminOnly={true}><DashboardRoute /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/bookings" element={<AdminBookings />} />
                <Route path="/dashboard/destinations" element={<Destinations />} />
                <Route path="/dashboard/hotels" element={<Hotels />} />
                <Route path="/dashboard/amenities" element={<Amenities />} />
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
    </AuthProvider>
  )
}

export default App
