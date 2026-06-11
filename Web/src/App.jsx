import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import Home from './pages/Home';
import Login from "./pages/Login";
import Layout from './components/Layout';
import Post from "./pages/Post";
import UserProfile from "./pages/userProfile/user_profile";
import Search from "./pages/Search";
import Register from "./pages/Register";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import './App.css';

const PrivateRoute = ({ user, onLogout, children }) => {
  if (!user) return <Navigate to="/login" />;
  return (
    <Layout user={user} onLogout={onLogout}>
      {children}
    </Layout>
  );
};

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user && localStorage.getItem("token") ? <Navigate to="/" /> : <Login onLogin={setUser} />} />

        <Route path="/register" element={user && localStorage.getItem("token") ? <Navigate to="/" /> : <Register onLogin={setUser} />} />
        
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
            <UserProfile 
                userIdViewer={user?.id} 
                currentUser={user} 
                onUpdateUser={handleUpdateUser} 
            />
          </PrivateRoute>
        } />

        <Route path="/search" element={
          <PrivateRoute user={user} onLogout={handleLogout}>
            <Search />
          </PrivateRoute>
        } />

        <Route path="/add-post" element={
          <PrivateRoute user={user} onLogout={handleLogout}>
            <AddPost />
          </PrivateRoute>
        } />

        <Route path="/edit-post/:postId" element={
          <PrivateRoute user={user} onLogout={handleLogout}>
            <EditPost user={user} />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;