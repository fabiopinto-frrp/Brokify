import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SplashScreen from './pages/SplashScreen'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}

export default App
