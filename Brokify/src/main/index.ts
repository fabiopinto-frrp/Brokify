import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

let iconPath = join(__dirname, '../../build/icon.png')

if (process.platform === 'win32') {
  iconPath = join(__dirname, '../../build/icon.ico')
} else if (process.platform === 'darwin') {
  iconPath = join(__dirname, '../../build/icon.icns')
}

let win

function createWindow(): void {
  win = new BrowserWindow({
    transparent: true,
    width: 1200,
    height: 800,

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

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
