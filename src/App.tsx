import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddToCart = lazy(() => import("./components/AddToCart"));

function App() {
  
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <Suspense fallback={<p>Page loading...</p>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<AddToCart />} />
      </Routes>
    </Suspense>
    </QueryClientProvider>
    </>
  )
}

export default App
