import React, { useState } from 'react';
import MangaCard from './MangaCard';
import './MangaList.css';

const MangaList = () => {
  // Simulando dados que futuramente virão de uma API
  const [mangas] = useState([
    {
      id: 1,
      titulo: "Monster",
      editora: "Panini",
      edição: "3ª edição",
      imagem: "https://i0.wp.com/blogbbm.com/wp-content/uploads/2019/12/81vi6wwvzvl.jpg?fit=736%2C1024&ssl=1"
    },
    {
      id: 2,
      titulo: "InuYasha",
      editora: "JBC",
      edição: "2ª edição",
      imagem: "https://i0.wp.com/blogbbm.com/wp-content/uploads/2021/08/InuYasha-01.jpg?ssl=1"
    },
    {
      id: 3,
      titulo: "Vinland Saga",
      editora: "Panini",
      edição: "2ª edição",
      imagem: "https://m.media-amazon.com/images/I/5171r6klPML.jpg"
    },
    {
      id: 4,
      titulo: "Pluto",
      editora: "Panini",
      edição: "2ª edição",
      imagem: "https://i0.wp.com/blogbbm.com/wp-content/uploads/2024/08/Pluto-01.webp?fit=693%2C1024&ssl=1g"
    },
    {
      id: 5,
      titulo: "Magi - O Labirinto da Magia",
      editora: "JBC",
      edição: "1ª edição",
      imagem: "https://m.media-amazon.com/images/I/81rILFOv-XL._SL1500_.jpg"
    },
    {
      id: 6,
      titulo: "Hajime no Ippo",
      editora: "MPEG",
      edição: "1ª edição",
      imagem: "https://m.media-amazon.com/images/I/81Z5ftSqMuL._SL1500_.jpg"
    }
  ]);

  return (
    <section className="manga-list-container">
      <h2>Catálogo</h2>
      <div className="manga-grid">
        {mangas.map((manga) => (
          <MangaCard 
            key={manga.id}
            titulo={manga.titulo}
            editora={manga.editora}
            edição={manga.edição}
            imagem={manga.imagem}
          />
        ))}
      </div>
    </section>
  );
};

export default MangaList;