import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import Login from "./pages/Login";
import Layout from './components/Layout';
import Post from "./pages/post";
import UserProfile from "./pages/userProfile/user_profile";
import Search from "./pages/search";
import Register from "./pages/Register";
import './App.css';

const PrivateRoute = ({ user, onLogout, children }) => {
  if (!user) return <Navigate to="/login" />;
  return (
    <Layout user={user} onLogout={onLogout}>
      {children}
    </Layout>
  );
};

const Home = () => <h1>Timeline (En construcción)</h1>;

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
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />} />

        <Route path="/register" element={user ? <Navigate to="/" /> : <Register onLogin={setUser} />} />
        
        <Route path="/" element={
          <PrivateRoute user={user} onLogout={handleLogout}>
            <Home />
          </PrivateRoute>
        } />

        <Route path="/post/:postId" element={
          <PrivateRoute user={user} onLogout={handleLogout}>
            <Post user={user} />
          </PrivateRoute>
        } />

        <Route path="/profile/:id" element={
          <PrivateRoute user={user} onLogout={handleLogout}>
            <UserProfile userIdViewer={user?.id} />
          </PrivateRoute>
        } />

        <Route path="/search" element={
          <PrivateRoute user={user} onLogout={handleLogout}>
            <Search />
          </PrivateRoute>
        } />

        <Route path="/add-post" element={
          <PrivateRoute user={user} onLogout={handleLogout}>
            <h1>Agregar post (En construcción)</h1>
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;