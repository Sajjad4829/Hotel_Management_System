import './App.css'
import Header from './Components/Header/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Facility from './Components/Facility/Facility'

function App() {
  return (
    <>

      <Header />
      <main>
        <Routes>
          {/* ইউজার শুরুতে সাইটে ঢুকলেই (/) হেডারের নিচে হোম পেজটি দেখতে পাবে */}
          <Route path="/" element={<Home />} />
           <Route path="/facility" element={<Facility />} />
          {/* ভবিষ্যতে অন্য পেজের লিংকগুলো জাস্ট এর নিচে এভাবে বসে যাবে: */}
          {/* <Route path="/rooms" element={<Rooms />} /> */}
        </Routes>
      </main>
    </>
  )
}

export default App
