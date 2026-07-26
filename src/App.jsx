import './App.css'
import Header from './Components/Header/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import FacilitiesPage from './Components/Facility/Facility'
import RoomsPage from './Components/Roompage/Rooms'
import RoomDetails from './Components/RoomDetails/RoomDetails'
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'
import BookingPage from './Components/Booking Page/Booking'
import SearchResultWrapper from './Components/SearchResults/SearchResultWrapper'
import HotelDetails from "./Components/HotelDetails/HotelDetails";
import RoomSelection from './Components/Roomselection Folder/Roomselection'
import AIAssistant from './Components/AI_Assistent/Aiassistant'
import OffersPage from './Components/OfferPage/OffersPage'
import OfferDetails from './Components/OfferDetails/OfferDetails'



function App() {
  return (
    <>

      <Header />
      <ScrollToTop />
       <AIAssistant />
      <main>
        <Routes>
          {/* ইউজার শুরুতে সাইটে ঢুকলেই (/) হেডারের নিচে হোম পেজটি দেখতে পাবে */}
          <Route path="/" element={<Home />} />
          <Route path="/facility" element={<FacilitiesPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/search-results" element={<SearchResultWrapper />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/hotel/:id/rooms" element={<RoomSelection />} />
          <Route path="/offers/:id" element={<OfferDetails />} />
        </Routes>
      </main>


     

      <Footer />

    </>
  )
}

export default App
