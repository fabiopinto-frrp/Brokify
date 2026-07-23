export interface PlaylistItem {
  id?: number
  title: string
  url: string
  artist?: string
  album?: string
  duration?: number
  thumbnail?: string
  addedAt?: string
}

export interface Playlist {
  id?: number
  name: string
  description?: string
  items: PlaylistItem[]
  createdAt: string
  updatedAt: string
}

export interface Setting {
  key: string
  value: string
  updatedAt: string
}
