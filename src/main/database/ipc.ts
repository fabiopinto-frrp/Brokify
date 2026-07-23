import { ipcMain } from 'electron'
import * as db from './db'

export function registerDatabaseIpcHandlers(): void {
  ipcMain.handle('db:createPlaylist', (_event, playlist) => db.createPlaylist(playlist))
  ipcMain.handle('db:getAllPlaylists', () => db.getAllPlaylists())
  ipcMain.handle('db:getPlaylistById', (_event, id) => db.getPlaylistById(id))
  ipcMain.handle('db:updatePlaylist', (_event, id, updates) => db.updatePlaylist(id, updates))
  ipcMain.handle('db:deletePlaylist', (_event, id) => db.deletePlaylist(id))
  ipcMain.handle('db:addItemToPlaylist', (_event, playlistId, item) =>
    db.addItemToPlaylist(playlistId, item)
  )
  ipcMain.handle('db:removeItemFromPlaylist', (_event, playlistId, itemId) =>
    db.removeItemFromPlaylist(playlistId, itemId)
  )
  ipcMain.handle('db:getSetting', (_event, key) => db.getSetting(key))
  ipcMain.handle('db:setSetting', (_event, key, value) => db.setSetting(key, value))
  ipcMain.handle('db:getYoutubeApiKey', () => db.getYoutubeApiKey())
  ipcMain.handle('db:setYoutubeApiKey', (_event, apiKey) => db.setYoutubeApiKey(apiKey))
}
