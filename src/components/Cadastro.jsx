import { useState } from 'react';
import './Cadastro.css';

export default function Cadastro({ adicionarManga }) {

  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    editora: '',
    edicao: '',
    capa: '',
    sinopse: ''
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();


    if (!formData.titulo || !formData.autor || !formData.editora) {
      alert("Por favor, preencha pelo menos Título, Autor e Editora.");
      return;
    }


    const novoManga = {
      id: Date.now(),
      ...formData
    };


    adicionarManga(novoManga);

    alert(`Mangá "${formData.titulo}" cadastrado com sucesso!`);


    setFormData({ titulo: '', autor: '', editora: '', edicao: '', capa: '', sinopse: '' });
  };

  return (
    <section className="cadastro-container">
      <h2>Cadastro de Novo Mangá</h2>

      <form onSubmit={handleSubmit} className="form-manga">
        <div className="form-group">
          <label>Título do Mangá:</label>
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
          <label>Edição / Formato:</label>
          <input 
            type="text" 
            name="edicao" 
            value={formData.edicao} 
            onChange={handleChange} 
            placeholder="Ex: 1ª Edição (Kanzenban)"
          />
        </div>


        <div className="form-group">
          <label>URL da Capa do Mangá:</label>
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
            placeholder="Resumo da história..."
            rows="4"
          />
        </div>

        <button type="submit" className="btn-submit">Salvar no Acervo</button>
      </form>
    </section>
  );
}