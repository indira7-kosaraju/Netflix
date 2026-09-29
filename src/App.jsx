import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { ListProvider } from './context/ListContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Movies from './pages/Movies'
import TVShows from './pages/TVShows'
import Search from './pages/Search'
import MovieDetails from './pages/MovieDetails'
import MyList from './pages/MyList'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ListProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<AppLayout />} />
          </Routes>
        </ListProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/my-list" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
