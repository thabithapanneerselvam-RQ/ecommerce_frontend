import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'


const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/Dashboard"));

function App() {
  
  return (
    <>
    <Suspense fallback={<p>Page loading...</p>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
    </>
  )
}

export default App
