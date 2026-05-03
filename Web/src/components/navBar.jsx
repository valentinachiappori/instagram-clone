import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navBar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
      setSearchText('');
    }
  };


  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Instagram
      </Link>

      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Search" 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
      </form>

      <div className="nav-links">
        <Link to="/" className="nav-item">
          <span>Inicio</span>
        </Link>

        <Link to="/add-post" className="nav-item">
          <span>Crear publicación</span>
        </Link>

        <Link to={`/profile/${user.id}`} className="nav-item">
          <img 
            src={user.image} 
            alt="Perfil" 
            className="profile-pic-small"
          />
          <span>Perfil</span>
        </Link>
      </div>

      <button onClick={onLogout} className="nav-item logout">
        <span>Salir</span>
      </button>
    </nav>
  );
};

export default Navbar;