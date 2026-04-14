import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MangaList from './components/MangaList';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <SearchBar />
        <MangaList />
      </main>
    </div>
  );
}

export default App;