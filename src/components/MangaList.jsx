import { useState } from 'react';
import MangaCard from './MangaCard';
import './MangaList.css';

export default function MangaList({ acervo, onVerDetalhes }) {
  const [termoBusca, setTermoBusca] = useState('');

  const acervoFiltrado = acervo.filter(manga => 
    manga.titulo.toLowerCase().includes(termoBusca.toLowerCase()) || 
    manga.autor.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <section className="manga-list-container">
      <h2>Catálogo de Obras</h2>

      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Buscar mangá por título ou autor..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {acervo.length === 0 ? (
        <div className="empty-message">
          <p>Nenhum mangá cadastrado no acervo ainda.</p>
          <p>Acesse a aba <strong>Cadastro</strong> para começar a adicionar suas obras!</p>
        </div>
      ) : acervoFiltrado.length === 0 ? (
        <div className="empty-message">
          <p>Nenhum mangá encontrado para "{termoBusca}".</p>
        </div>
      ) : (
        <div className="manga-grid">
          {[...acervoFiltrado].sort((a, b) => a.titulo.localeCompare(b.titulo)).map((manga) => (
            <MangaCard 
              key={manga.id} 
              manga={manga} 
              onVerDetalhes={onVerDetalhes} 
            />
          ))}
        </div>
      )}
    </section>
  );
}