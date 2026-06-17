import './App.css'
import Header from './Components/Header/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import FacilitiesPage from './Components/Facility/Facility'
import RoomsPage from './Components/Roompage/Rooms'
import RoomDetails from './Components/RoomDetails/RoomDetails'

function App() {
  return (
    <>

      <Header />
      <main>
        <Routes>
          {/* ইউজার শুরুতে সাইটে ঢুকলেই (/) হেডারের নিচে হোম পেজটি দেখতে পাবে */}
          <Route path="/" element={<Home />} />
           <Route path="/facility" element={<FacilitiesPage />} />
           <Route path="/rooms" element={<RoomsPage />} />
           <Route path="/rooms/:id" element={<RoomDetails />} />
          {/* ভবিষ্যতে অন্য পেজের লিংকগুলো জাস্ট এর নিচে এভাবে বসে যাবে: */}
          {/* <Route path="/rooms" element={<Rooms />} /> */}
        </Routes>
      </main>

      <Footer />

    </>
  )
}

export default App
