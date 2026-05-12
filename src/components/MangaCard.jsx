import './MangaCard.css';

export default function MangaCard({ manga, onVerDetalhes }) {
  return (
    <article className="manga-card">
      
      {manga.capa && (
        <div className="capa-container">
          <img src={manga.capa} alt={`Capa do mangá ${manga.titulo}`} className="img-capa" />
        </div>
      )}

      <div className="manga-info">
        <h3>{manga.titulo}</h3>
        <p><strong>Editora:</strong> {manga.editora}</p>
        <p><strong>Edição:</strong> {manga.edicao}</p>
      </div>

      <button className="btn-detalhes" onClick={() => onVerDetalhes(manga)}>
        Ver detalhes
      </button>
    </article>
  );
}