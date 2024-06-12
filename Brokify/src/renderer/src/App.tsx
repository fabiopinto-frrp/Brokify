import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SplashScreen from './pages/SplashScreen/SplashScreen'
import Genres from './pages/Genres/Genres'
import Playlists from './pages/Playlists/Playlists'
import About from './pages/About/About'

import MediaPlayer from './components/MediaPlayer/MediaPlayer'

function App(): JSX.Element {
  return (
    <>
      <MediaPlayer />
      <HashRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Genres" element={<Genres />} />
          <Route path="/Playlists" element={<Playlists />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
