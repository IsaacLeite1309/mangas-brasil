import { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams
} from 'react-router-dom';
import Header from './components/Header';
import MangaList from './components/MangaList';
import Sobre from './components/Sobre';
import Cadastro from './components/Cadastro';
import Detalhes from './components/Detalhes';
import api from './services/api';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const [acervo, setAcervo] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregarAcervo = useCallback(async () => {
    try {
      setCarregando(true);
      setErro('');
      const resposta = await api.get('/mangas');
      setAcervo(resposta.data);
    } catch {
      setErro('Nao foi possivel carregar o acervo. Confira se o backend esta rodando.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarAcervo();
  }, [carregarAcervo]);

  const adicionarManga = async (novoManga) => {
    const resposta = await api.post('/mangas', novoManga);
    setAcervo((acervoAtual) => [...acervoAtual, resposta.data]);
    return resposta.data;
  };

  const atualizarManga = async (mangaAtualizado) => {
    const resposta = await api.put(`/mangas/${mangaAtualizado._id}`, mangaAtualizado);
    setAcervo((acervoAtual) => acervoAtual.map((manga) => (
      manga._id === resposta.data._id ? resposta.data : manga
    )));
    return resposta.data;
  };

  const removerManga = async (id) => {
    await api.delete(`/mangas/${id}`);
    setAcervo((acervoAtual) => acervoAtual.filter((manga) => manga._id !== id));
  };

  return (
    <div className="app-container">
      <Header />

      <main className="content">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/catalogo" replace />}
          />
          <Route
            path="/catalogo"
            element={(
              <MangaList
                acervo={acervo}
                carregando={carregando}
                erro={erro}
                recarregar={carregarAcervo}
              />
            )}
          />
          <Route
            path="/cadastro"
            element={<CadastroPage adicionarManga={adicionarManga} />}
          />
          <Route
            path="/editar/:id"
            element={(
              <EditarPage
                acervo={acervo}
                carregando={carregando}
                atualizarManga={atualizarManga}
              />
            )}
          />
          <Route
            path="/mangas/:id"
            element={(
              <DetalhesPage
                acervo={acervo}
                carregando={carregando}
                removerManga={removerManga}
              />
            )}
          />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<Navigate to="/catalogo" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function CadastroPage({ adicionarManga }) {
  const navigate = useNavigate();

  const salvarManga = async (novoManga) => {
    await adicionarManga(novoManga);
    navigate('/catalogo');
  };

  return (
    <Cadastro
      adicionarManga={salvarManga}
      cancelarEdicao={() => navigate('/catalogo')}
    />
  );
}

function EditarPage({ acervo, carregando, atualizarManga }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const manga = acervo.find((item) => item._id === id);

  const salvarEdicao = async (mangaAtualizado) => {
    const mangaSalvo = await atualizarManga(mangaAtualizado);
    navigate(`/mangas/${mangaSalvo._id}`);
  };

  if (carregando) {
    return <MensagemPagina texto="Carregando manga..." />;
  }

  if (!manga) {
    return <MensagemPagina texto="Manga nao encontrado no acervo." />;
  }

  return (
    <Cadastro
      atualizarManga={salvarEdicao}
      mangaEmEdicao={manga}
      cancelarEdicao={() => navigate(`/mangas/${manga._id}`)}
    />
  );
}

function DetalhesPage({ acervo, carregando, removerManga }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const manga = acervo.find((item) => item._id === id);

  const remover = async (mangaId) => {
    await removerManga(mangaId);
    navigate('/catalogo');
  };

  if (carregando) {
    return <MensagemPagina texto="Carregando detalhes..." />;
  }

  if (!manga) {
    return <MensagemPagina texto="Manga nao encontrado no acervo." />;
  }

  return (
    <Detalhes
      manga={manga}
      voltar={() => navigate('/catalogo')}
      editar={() => navigate(`/editar/${manga._id}`)}
      remover={remover}
    />
  );
}

function MensagemPagina({ texto }) {
  return (
    <section className="manga-list-container">
      <div className="empty-message">
        <p>{texto}</p>
      </div>
    </section>
  );
}

export default App;
