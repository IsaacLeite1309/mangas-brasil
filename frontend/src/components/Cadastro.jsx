import { useEffect, useState } from 'react';
import './Cadastro.css';

const formInicial = {
  titulo: '',
  autor: '',
  editora: '',
  edicao: '',
  preco: '',
  capa: '',
  sinopse: ''
};

export default function Cadastro({
  adicionarManga,
  atualizarManga,
  mangaEmEdicao,
  cancelarEdicao
}) {
  const [formData, setFormData] = useState(formInicial);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const modoEdicao = Boolean(mangaEmEdicao);

  useEffect(() => {
    if (mangaEmEdicao) {
      setFormData({
        ...formInicial,
        ...mangaEmEdicao,
        preco: mangaEmEdicao.preco ? String(mangaEmEdicao.preco) : ''
      });
      return;
    }

    setFormData(formInicial);
  }, [mangaEmEdicao]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErro('');

    if (!formData.titulo || !formData.autor || !formData.editora) {
      setErro('Preencha pelo menos Titulo, Autor e Editora.');
      return;
    }

    const dadosManga = {
      ...formData,
      titulo: formData.titulo.trim(),
      autor: formData.autor.trim(),
      editora: formData.editora.trim(),
      edicao: formData.edicao.trim(),
      preco: formData.preco ? Number(formData.preco) : 0,
      capa: formData.capa.trim(),
      sinopse: formData.sinopse.trim()
    };

    try {
      setSalvando(true);

      if (modoEdicao) {
        await atualizarManga({
          ...dadosManga,
          _id: mangaEmEdicao._id
        });
        return;
      }

      await adicionarManga(dadosManga);
      setFormData(formInicial);
    } catch {
      setErro('Nao foi possivel salvar. Confira se o backend esta rodando.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <section className="cadastro-container">
      <h2>{modoEdicao ? 'Editar manga' : 'Cadastro de novo manga'}</h2>

      <form onSubmit={handleSubmit} className="form-manga">
        {erro && <p className="form-error">{erro}</p>}

        <div className="form-group">
          <label>Titulo do manga:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ex: Monster"
          />
        </div>

        <div className="form-group">
          <label>Autor(a):</label>
          <input
            type="text"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            placeholder="Ex: Naoki Urasawa"
          />
        </div>

        <div className="form-group">
          <label>Editora:</label>
          <input
            type="text"
            name="editora"
            value={formData.editora}
            onChange={handleChange}
            placeholder="Ex: Panini"
          />
        </div>

        <div className="form-group">
          <label>Edicao / Formato:</label>
          <input
            type="text"
            name="edicao"
            value={formData.edicao}
            onChange={handleChange}
            placeholder="Ex: 1a edicao (Kanzenban)"
          />
        </div>

        <div className="form-group">
          <label>Preco de capa:</label>
          <input
            type="number"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            placeholder="Ex: 49.90"
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>URL da capa do manga:</label>
          <input
            type="url"
            name="capa"
            value={formData.capa}
            onChange={handleChange}
            placeholder="Ex: https://site.com/imagem.jpg"
          />
        </div>

        <div className="form-group">
          <label>Sinopse:</label>
          <textarea
            name="sinopse"
            value={formData.sinopse}
            onChange={handleChange}
            placeholder="Resumo da historia..."
            rows="4"
          />
        </div>

        <div className="form-actions">
          {modoEdicao && (
            <button type="button" className="btn-secondary" onClick={cancelarEdicao}>
              Cancelar
            </button>
          )}
          <button type="submit" className="btn-submit" disabled={salvando}>
            {salvando ? 'Salvando...' : modoEdicao ? 'Salvar alteracoes' : 'Salvar no acervo'}
          </button>
        </div>
      </form>
    </section>
  );
}
