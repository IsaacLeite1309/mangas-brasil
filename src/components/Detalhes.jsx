import './Detalhes.css';

export default function Detalhes({ manga, voltar }) {
  if (!manga) return null;

  return (
    <section className="detalhes-container">
      <button className="btn-voltar" onClick={voltar}>
        &larr; Voltar para o Catálogo
      </button>

      <div className="detalhes-obra">
        {manga.capa && (
          <div className="detalhes-imagem">
            <img src={manga.capa} alt={`Capa de ${manga.titulo}`} />
          </div>
        )}

        <div className="dados-completos">
          <h2>{manga.titulo}</h2>
          <p><strong>Autor:</strong> {manga.autor}</p>
          <p><strong>Editora:</strong> {manga.editora}</p>
          <p><strong>Edição:</strong> {manga.edicao}</p>
          {manga.sinopse && (
            <p><strong>Sinopse:</strong> {manga.sinopse}</p>
          )}
        </div>
      </div>
    </section>
  );
}
