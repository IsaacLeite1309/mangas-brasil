import './MangaCard.css';

const MangaCard = ({ titulo, editora, edição, imagem }) => {
  return (
    <div className="manga-card">
      <div className="manga-image">
        <img src={imagem || 'https://via.placeholder.com/150x220?text=Sem+Capa'} alt={titulo} />
      </div>
      <div className="manga-info">
        <h3>{titulo}</h3>
        <p><strong>Editora:</strong> {editora}</p>
        <p><strong>Edição:</strong> {edição}</p>
        <button className="btn-detalhes">Ver Detalhes</button>
      </div>
    </div>
  );
};

export default MangaCard;