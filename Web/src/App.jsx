import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import Login from "./pages/Login";
import UserProfileLogged from "./pages/userProfile/user_profile";
import Layout from './components/Layout';
import Post from "./pages/post";
import './App.css';

const isAuthenticated = () => !!localStorage.getItem("token");

const PrivateRoute = ({ user, onLogout, children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;
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
        <Route path="/login" element={isAuthenticated() ? <Navigate to="/" /> : <Login onLogin={setUser} />} />

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
            <UserProfileLogged userIdViewer={user?.id} />
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;