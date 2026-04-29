import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useState } from 'react'
import Navbar from './components/Navbar'
import UserProfileLogged from './pages/userProfile/user_profile_logged'
import './App.css'

const isAuthenticated = () => !!localStorage.getItem("token");

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const Home = () => <h1>Timeline (En construcción)</h1>;
const Profile = () => UserProfileLogged

function App() {
  
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
    
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {user && <Navbar user={user} onLogout={handleLogout} />}

        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={<PrivateRoute> <Home /> </PrivateRoute>} 
            />
            <Route 
              path="/profile/:id" 
              element={<PrivateRoute> <Profile /> </PrivateRoute>} 
            />
            <Route path="*" element={<Navigate to="/" />} />
            <Route 
              path="/my-profile" 
              element={user ? <UserProfileLogged userId={user.id} /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
export default App