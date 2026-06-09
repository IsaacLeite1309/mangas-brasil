import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="main-header">
      <div className="logo">
        <h1>Manga<span>Brasil</span></h1>
      </div>

      <nav className="navigation">
        <ul>
          <li>
            <NavLink to="/catalogo">
              Catalogo
            </NavLink>
          </li>
          <li>
            <NavLink to="/cadastro">
              Cadastro
            </NavLink>
          </li>
          <li>
            <NavLink to="/sobre">
              Sobre
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
