import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'


const Home = () => <h1>Timeline (En construcción)</h1>
const Login = () => <h1>Login (En construcción)</h1>
const Profile = () => <h1>Perfil de Usuario (En construcción)</h1>

function App() {
  const [user, setUser] = useState({ id: 'user_1', name: 'Lucre' }); //usuario de prueba!!!!!!

  const handleLogout = () => {
    setUser(null); //hasta que el login esté listo!!!!!!
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {user && <Navbar user={user} onLogout={handleLogout} />}

        <div className="main-content">
          <Routes>
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />

            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            
            <Route 
              path="/profile/:id" 
              element={user ? <Profile /> : <Navigate to="/login" />} 
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App