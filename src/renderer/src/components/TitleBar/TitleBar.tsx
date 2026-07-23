// import { ipcRenderer } from 'electron'
import './titleBar.css'
const { ipcRenderer } = require('electron')

const TitleBar: React.FC = () => {
  const minimize = (): void => {
    ipcRenderer.send('minimize-button')
  }

  const maximize = (): void => {
    ipcRenderer.send('maximize-button')
  }

  const close = (): void => {
    ipcRenderer.send('close-button')
  }

  return (
    <div id="title-bar">
      <div id="title">
        <img src="./src/assets/icon.ico" alt="App Icon" width="20" height="20" />
        Brokify
      </div>
      <div id="window-controls">
        <button id="minimize-button" onClick={minimize}></button>
        <button id="maximize-button" onClick={maximize}></button>
        <button id="close-button" onClick={close}></button>
      </div>
    </div>
  )
}

export default TitleBar
