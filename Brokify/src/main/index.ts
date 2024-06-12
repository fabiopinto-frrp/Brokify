import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import dotenv from 'dotenv'

let iconPath = join(__dirname, '../../build/icon.png')

if (process.platform === 'win32') {
  iconPath = join(__dirname, '../../build/icon.ico')
} else if (process.platform === 'darwin') {
  iconPath = join(__dirname, '../../build/icon.icns')
}

let win

dotenv.config()

function createWindow(): void {
  win = new BrowserWindow({
    transparent: true,
    width: 1200,
    minWidth: 1200,
    height: 950,
    minHeight: 950,

    show: false,
    autoHideMenuBar: true,
    icon: iconPath,
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: false,
      nodeIntegration: true,
      sandbox: false
    }
  })

  win.on('ready-to-show', () => {
    win?.show()
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

let windowMaximazed = false

ipcMain.on('close-button', () => {
  app.quit()
})
ipcMain.on('minimize-button', () => {
  win.minimize()
})
ipcMain.on('maximize-button', () => {
  if (windowMaximazed) {
    win.unmaximize()
  } else {
    win.maximize()
  }
  windowMaximazed = !windowMaximazed
})

ipcMain.on('getEnvVariable', (e) => {
  e.sender.send('envVariable', process.env.YOUTUBE_API_KEY)
})

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
