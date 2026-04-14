import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [termoBusca, setTermoBusca] = useState('');

  const aoMudar = (evento) => {
    setTermoBusca(evento.target.value);
  };

  const aoEnviar = (evento) => {
    evento.preventDefault();
    // Na Sprint 1, apenas exibimos o que foi digitado
    alert(`Você está buscando por: ${termoBusca}`);
  };

  return (
    <div className="search-container">
      <form onSubmit={aoEnviar} className="search-form">
        <input
          type="text"
          placeholder="Busque por título ou editora..."
          value={termoBusca}
          onChange={aoMudar}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Pesquisar
        </button>
      </form>
      {termoBusca && (
        <p className="search-preview">
          Buscando por: <strong>{termoBusca}</strong>
        </p>
      )}
    </div>
  );
};

export default SearchBar;