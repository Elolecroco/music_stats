import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import PrevPageBtn from './components/Arrows/PrevPageBtn';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Stats from './pages/Stats';
import StatsSearchResults from './components/Search/StatsSearchResults';
import ArtistsStats from './pages/ArtistsStats';
import YearStats from './pages/YearStats';
import SeasonsStats from './pages/SeasonsStats';
import LanguagesStats from './pages/LanguagesStats';
import ArtistPage from './pages/ArtistPage';
import AlbumPage from './pages/AlbumPage';
import SongPage from './pages/SongPage';
import Genre from './pages/Genre';
import Playlist from './pages/Playlist';
import './App.css';

const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

function App() {
  
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/library' element={<Library />} />
        <Route path='/stats' element={<Stats />} />
        <Route path='/stats/:search' element={<StatsSearchResults />} />
        <Route path='/stats/artists' element={<ArtistsStats />} />
        <Route path='/stats/year' element={<YearStats />} />
        <Route path='/stats/season' element={<SeasonsStats />} />
        <Route path='/stats/language' element={<LanguagesStats />} />
        <Route path='/library/:playlistName' element={<Playlist />} />
        <Route path='/artists/:id' element={<ArtistPage />} />
        <Route path='/albums/:id' element={<AlbumPage />} />
        <Route path='/song/:id' element={<SongPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
