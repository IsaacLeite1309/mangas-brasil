import './Header.css';

export default function Header({ paginaAtual, setPaginaAtual }) {
  return (
    <header className="main-header">
      <div className="logo">
        <h1>Manga<span>Brasil</span></h1>
      </div>
      
      <nav className="navigation">
        <ul>
          <li>
            <button 
              className={paginaAtual === 'Catalogo' ? 'active' : ''} 
              onClick={() => setPaginaAtual('Catalogo')}
            >
              Catálogo
            </button>
          </li>
          <li>
            <button 
              className={paginaAtual === 'Cadastro' ? 'active' : ''} 
              onClick={() => setPaginaAtual('Cadastro')}
            >
              Cadastro
            </button>
          </li>
          <li>
            <button 
              className={paginaAtual === 'Sobre' ? 'active' : ''} 
              onClick={() => setPaginaAtual('Sobre')}
            >
              Sobre
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}