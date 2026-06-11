import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// ১. প্রথমে BrowserRouter ইম্পোর্ট করুন
import { BrowserRouter } from 'react-router-dom' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ২. পুরো App-কে BrowserRouter দিয়ে মুড়িয়ে দিন */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)