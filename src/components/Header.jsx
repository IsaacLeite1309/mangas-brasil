import './Header.css'; 

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <h1>Mangá<span>Brasil</span></h1>
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="#catalogo">Catálogo</a></li>
          <li><a href="#sobre">Sobre</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;