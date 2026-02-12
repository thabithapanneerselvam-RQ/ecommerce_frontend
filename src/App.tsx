import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from './routes/PrivateRoute';

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

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<AddToCart />} />
        </Route>
      </Routes>

    </Suspense>
    </QueryClientProvider>
    </>
  )
}

export default App
