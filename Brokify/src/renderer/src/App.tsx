import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SplashScreen from './pages/SplashScreen/SplashScreen'
import Playlists from './pages/Playlists/Playlists'
import About from './pages/About/About'

import MediaPlayer from './components/MediaPlayer/MediaPlayer'
import Cursor from './components/Cursor'
import QueuePanel from './components/QueuePanel/QueuePanel'

function App(): JSX.Element {
  return (
    <>
      <Cursor />
      <MediaPlayer />
      <QueuePanel />
      <HashRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Playlists" element={<Playlists />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
