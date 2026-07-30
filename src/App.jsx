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
import PublicLayout from './Components/PublicLayout.jsx'
import DashboardRoute from './Components/DashboardRoute.jsx'





function App() {
  return (
    <>

      <ScrollToTop />
      <AIAssistant />
      <main>

        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/facility" element={<FacilitiesPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/book/:id" element={<BookingPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/search-results" element={<SearchResultWrapper />} />
            <Route path="/hotel/:id" element={<SearchHotelDetails />} />
            <Route path="/hotel/:id/rooms" element={<RoomSelection />} />
            <Route path="/offers/:id" element={<OfferDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route element={<DashboardRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashrooms" element={<RoomManagement />} />
          </Route>


        </Routes>

      </main>


    </>
  )
}

export default App
