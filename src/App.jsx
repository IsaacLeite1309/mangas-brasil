import { useState } from 'react';
import Header from './components/Header';

import MangaList from './components/MangaList';
import Sobre from './components/Sobre';
import Cadastro from './components/Cadastro';
import Detalhes from './components/Detalhes'; // Importe a nova página
import { useLocalStorage } from './hooks/useLocalStorage';
import './index.css';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('Catalogo');
  const [acervo, setAcervo] = useLocalStorage('mangasBrasil_db', []);
  
  // NOVO ESTADO: Guarda os dados do mangá que o usuário quer ver os detalhes
  const [mangaSelecionado, setMangaSelecionado] = useState(null);

  const adicionarManga = (novoManga) => {
    setAcervo([...acervo, novoManga]);
  };

  // Função disparada quando clica em "Ver detalhes" no Card
  const abrirDetalhes = (manga) => {
    setMangaSelecionado(manga);
    setPaginaAtual('Detalhes'); // Troca a tela
  };

  // Função para o botão "Voltar" na página de detalhes
  const voltarParaCatalogo = () => {
    setMangaSelecionado(null);
    setPaginaAtual('Catalogo');
  };

  return (
    <div className="app-container">
      <Header paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual} />
      
      <main className="content">
        {/* Passamos a função abrirDetalhes para a Lista repassar aos Cards */}
        {paginaAtual === 'Catalogo' && (
          <MangaList acervo={acervo} onVerDetalhes={abrirDetalhes} />
        )}
        
        {paginaAtual === 'Sobre' && <Sobre />}
        
        {paginaAtual === 'Cadastro' && <Cadastro adicionarManga={adicionarManga} />}
        
        {/* Nova rota condicional para a página de detalhes */}
        {paginaAtual === 'Detalhes' && (
           <Detalhes manga={mangaSelecionado} voltar={voltarParaCatalogo} />
        )}
      </main>
    </div>
  );
}

export default App;