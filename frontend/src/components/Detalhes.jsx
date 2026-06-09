import { useState } from 'react';
import './Detalhes.css';

export default function Detalhes({ manga, voltar, editar, remover }) {
  const [removendo, setRemovendo] = useState(false);
  const [erro, setErro] = useState('');

  if (!manga) return null;

  const confirmarExclusao = async () => {
    const confirmou = window.confirm(`Excluir "${manga.titulo}" do acervo?`);

    if (!confirmou) {
      return;
    }

    try {
      setErro('');
      setRemovendo(true);
      await remover(manga._id);
    } catch {
      setErro('Nao foi possivel remover. Confira se o backend esta rodando.');
      setRemovendo(false);
    }
  };

  return (
    <section className="detalhes-container">
      <button className="btn-voltar" onClick={voltar}>
        &larr; Voltar para o catalogo
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
          {manga.edicao && <p><strong>Edicao:</strong> {manga.edicao}</p>}
          {manga.preco > 0 && <p><strong>Preco de capa:</strong> R$ {Number(manga.preco).toFixed(2)}</p>}
          {manga.sinopse && (
            <p><strong>Sinopse:</strong> {manga.sinopse}</p>
          )}

          {erro && <p className="detalhes-error">{erro}</p>}

          <div className="detalhes-actions">
            <button className="btn-editar" onClick={() => editar(manga)}>
              Editar obra
            </button>
            <button className="btn-excluir" onClick={confirmarExclusao} disabled={removendo}>
              {removendo ? 'Excluindo...' : 'Excluir obra'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
