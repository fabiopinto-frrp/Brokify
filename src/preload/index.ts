import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Playlist, PlaylistItem } from '../shared/types'

// Custom APIs for renderer
const api = {
  db: {
    createPlaylist: (playlist: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> =>
      ipcRenderer.invoke('db:createPlaylist', playlist),
    getAllPlaylists: (): Promise<Playlist[]> => ipcRenderer.invoke('db:getAllPlaylists'),
    getPlaylistById: (id: number): Promise<Playlist | undefined> =>
      ipcRenderer.invoke('db:getPlaylistById', id),
    updatePlaylist: (id: number, updates: Partial<Omit<Playlist, 'id' | 'createdAt'>>): Promise<void> =>
      ipcRenderer.invoke('db:updatePlaylist', id, updates),
    deletePlaylist: (id: number): Promise<void> => ipcRenderer.invoke('db:deletePlaylist', id),
    addItemToPlaylist: (
      playlistId: number,
      item: Omit<PlaylistItem, 'id' | 'addedAt'>
    ): Promise<number> => ipcRenderer.invoke('db:addItemToPlaylist', playlistId, item),
    removeItemFromPlaylist: (playlistId: number, itemId: number): Promise<void> =>
      ipcRenderer.invoke('db:removeItemFromPlaylist', playlistId, itemId),
    getSetting: (key: string): Promise<string | null> => ipcRenderer.invoke('db:getSetting', key),
    setSetting: (key: string, value: string): Promise<void> =>
      ipcRenderer.invoke('db:setSetting', key, value),
    getYoutubeApiKey: (): Promise<string | null> => ipcRenderer.invoke('db:getYoutubeApiKey'),
    setYoutubeApiKey: (apiKey: string): Promise<void> =>
      ipcRenderer.invoke('db:setYoutubeApiKey', apiKey)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
