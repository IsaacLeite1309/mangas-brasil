import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MangaCard from './MangaCard';
import './MangaList.css';

export default function MangaList({ acervo, carregando, erro, recarregar }) {
  const [termoBusca, setTermoBusca] = useState('');
  const navigate = useNavigate();

  const acervoFiltrado = acervo.filter((manga) => {
    const busca = termoBusca.toLowerCase();
    return manga.titulo.toLowerCase().includes(busca)
      || manga.autor.toLowerCase().includes(busca)
      || manga.editora.toLowerCase().includes(busca);
  });

  return (
    <section className="manga-list-container">
      <h2>Catalogo de obras</h2>

      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Buscar manga por titulo, autor ou editora..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {carregando ? (
        <div className="empty-message">
          <p>Carregando acervo...</p>
        </div>
      ) : erro ? (
        <div className="empty-message">
          <p>{erro}</p>
          <button className="btn-retry" onClick={recarregar}>Tentar novamente</button>
        </div>
      ) : acervo.length === 0 ? (
        <div className="empty-message">
          <p>Nenhum manga cadastrado no acervo ainda.</p>
          <p>Acesse a aba <strong>Cadastro</strong> para comecar a adicionar suas obras.</p>
        </div>
      ) : acervoFiltrado.length === 0 ? (
        <div className="empty-message">
          <p>Nenhum manga encontrado para "{termoBusca}".</p>
        </div>
      ) : (
        <div className="manga-grid">
          {[...acervoFiltrado].sort((a, b) => a.titulo.localeCompare(b.titulo)).map((manga) => (
            <MangaCard
              key={manga._id}
              manga={manga}
              onVerDetalhes={() => navigate(`/mangas/${manga._id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
