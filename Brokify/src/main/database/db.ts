import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'path'
import { createPlaylistsTableSQL, createSettingsTableSQL } from './schema'
import { Playlist, PlaylistItem, Setting } from '../../shared/types'

let db: Database.Database | null = null

function getDb(): Database.Database {
  if (!db) {
    const dbPath = join(app.getPath('userData'), 'brokify.db')
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    db.exec(createPlaylistsTableSQL)
    db.exec(createSettingsTableSQL)
  }

  return db
}

function serializeItems(items: PlaylistItem[]): string {
  return JSON.stringify(items || [])
}

function deserializeItems(itemsText: string): PlaylistItem[] {
  if (!itemsText) {
    return []
  }

  try {
    return JSON.parse(itemsText) as PlaylistItem[]
  } catch {
    return []
  }
}

export function createPlaylist(playlist: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>): number {
  const now = new Date().toISOString()

  const result = getDb()
    .prepare(
      `INSERT INTO playlists (name, description, items, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(playlist.name, playlist.description || null, serializeItems(playlist.items), now, now)

  return result.lastInsertRowid as number
}

export function getAllPlaylists(): Playlist[] {
  return getDb()
    .prepare('SELECT * FROM playlists')
    .all()
    .map((row: any) => ({
      ...row,
      items: deserializeItems(row.items)
    })) as Playlist[]
}

export function getPlaylistById(id: number): Playlist | undefined {
  const row = getDb().prepare('SELECT * FROM playlists WHERE id = ?').get(id) as any
  if (!row) return undefined

  return {
    ...row,
    items: deserializeItems(row.items)
  } as Playlist
}

export function updatePlaylist(
  id: number,
  updates: Partial<Omit<Playlist, 'id' | 'createdAt'>>
): void {
  const playlist = getPlaylistById(id)
  if (!playlist) {
    throw new Error(`Playlist with id "${id}" not found.`)
  }

  const merged: Playlist = {
    ...playlist,
    ...updates,
    items: updates.items ?? playlist.items,
    updatedAt: new Date().toISOString()
  }

  getDb()
    .prepare(
      `UPDATE playlists
       SET name = ?, description = ?, items = ?, updatedAt = ?
       WHERE id = ?`
    )
    .run(merged.name, merged.description || null, serializeItems(merged.items), merged.updatedAt, id)
}

export function deletePlaylist(id: number): void {
  getDb().prepare('DELETE FROM playlists WHERE id = ?').run(id)
}

export function addItemToPlaylist(
  playlistId: number,
  item: Omit<PlaylistItem, 'id' | 'addedAt'>
): number {
  const playlist = getPlaylistById(playlistId)
  if (!playlist) {
    throw new Error(`Playlist with id "${playlistId}" not found.`)
  }

  const itemId = Math.max(0, ...playlist.items.map((i) => i.id || 0)) + 1
  const newItem: PlaylistItem = {
    id: itemId,
    ...item,
    addedAt: new Date().toISOString()
  }

  const updatedItems = [...playlist.items, newItem]
  updatePlaylist(playlistId, { items: updatedItems })

  return itemId
}

export function removeItemFromPlaylist(playlistId: number, itemId: number): void {
  const playlist = getPlaylistById(playlistId)
  if (!playlist) {
    throw new Error(`Playlist with id "${playlistId}" not found.`)
  }

  const updatedItems = playlist.items.filter((item) => item.id !== itemId)
  updatePlaylist(playlistId, { items: updatedItems })
}

export function setSetting(key: string, value: string): void {
  const now = new Date().toISOString()
  getDb()
    .prepare(
      `INSERT OR REPLACE INTO settings (key, value, updatedAt)
       VALUES (?, ?, ?)`
    )
    .run(key, value, now)
}

export function getSetting(key: string): string | null {
  const row = getDb().prepare('SELECT * FROM settings WHERE key = ?').get(key) as Setting | undefined
  return row ? row.value : null
}

export function setYoutubeApiKey(apiKey: string): void {
  setSetting('YOUTUBE_API_KEY', apiKey)
}

export function getYoutubeApiKey(): string | null {
  return getSetting('YOUTUBE_API_KEY')
}
