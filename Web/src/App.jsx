import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { storageService } from './api/storageService';
import { getTimeline } from './api/userService';
import LoadingSpinner from './components/LoadingSpinner';
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
  const [user, setUser] = useState(storageService.getUser());
  const [authLoading, setAuthLoading] = useState(!!storageService.getToken());

  useEffect(() => {
    if (!storageService.getToken()) return;

    getTimeline()
      .then(data => {
        setUser(data);
        storageService.setUser(data);
      })
      .catch(() => {
        storageService.clearAll();
        setUser(null);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  const handleLogout = () => {
    storageService.clearAll();
    setUser(null);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    storageService.setUser(updatedUser);
  };

  if (authLoading) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user && storageService.getToken() ? <Navigate to="/" /> : <Login onLogin={setUser} />} />

        <Route path="/register" element={user && storageService.getToken() ? <Navigate to="/" /> : <Register onLogin={setUser} />} />
        
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