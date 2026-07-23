import { ElectronAPI } from '@electron-toolkit/preload'
import { Playlist, PlaylistItem } from '../shared/types'

interface DbApi {
  createPlaylist: (playlist: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>) => Promise<number>
  getAllPlaylists: () => Promise<Playlist[]>
  getPlaylistById: (id: number) => Promise<Playlist | undefined>
  updatePlaylist: (id: number, updates: Partial<Omit<Playlist, 'id' | 'createdAt'>>) => Promise<void>
  deletePlaylist: (id: number) => Promise<void>
  addItemToPlaylist: (playlistId: number, item: Omit<PlaylistItem, 'id' | 'addedAt'>) => Promise<number>
  removeItemFromPlaylist: (playlistId: number, itemId: number) => Promise<void>
  getSetting: (key: string) => Promise<string | null>
  setSetting: (key: string, value: string) => Promise<void>
  getYoutubeApiKey: () => Promise<string | null>
  setYoutubeApiKey: (apiKey: string) => Promise<void>
}

interface Api {
  db: DbApi
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
