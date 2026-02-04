import './App.css'
import Login from "./components/Login"
import { Routes, Route } from 'react-router-dom'
import Dashboard from "./components/Dashboard"
import FlashSale from './components/FlashSale'

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flashsale" element={<FlashSale />} />
      </Routes>
    
    </>
  )
}

export default App
