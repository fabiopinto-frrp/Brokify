import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FaPlay, FaTrash, FaTimes } from 'react-icons/fa'
import {
  Backdrop,
  Panel,
  PanelHeader,
  HeaderText,
  PanelTitle,
  PanelDescription,
  CloseButton,
  ActionsRow,
  PlayAllButton,
  DeleteButton,
  SongCount,
  SongList,
  SongRow,
  SongThumbnail,
  SongThumbnailPlaceholder,
  SongInfo,
  SongTitle,
  SongArtist,
  RemoveSongButton,
  EmptySongs
} from './PlaylistDetailElements'
import { Playlist, PlaylistItem } from '@shared/types'
import { useStore, Track } from '@renderer/stores/store'
import { theme } from '@renderer/styles/theme'

function extractVideoId(url: string): string {
  try {
    return new URL(url).searchParams.get('v') || ''
  } catch {
    return ''
  }
}

function itemToTrack(item: PlaylistItem): Track {
  return {
    videoId: extractVideoId(item.url),
    title: item.title,
    artist: item.artist || '',
    thumbnail: item.thumbnail || ''
  }
}

interface PlaylistDetailPanelProps {
  playlist: Playlist | null
  onClose: () => void
  onPlaylistChanged: () => void
  onPlaylistDeleted: () => void
}

const PlaylistDetailPanel: React.FC<PlaylistDetailPanelProps> = ({
  playlist,
  onClose,
  onPlaylistChanged,
  onPlaylistDeleted
}) => {
  const { playQueue } = useStore()
  const [songs, setSongs] = useState<PlaylistItem[]>([])

  useEffect(() => {
    setSongs(playlist?.items || [])
  }, [playlist])

  const handlePlayAll = (): void => {
    if (!songs.length) return
    playQueue(songs.map(itemToTrack), 0)
  }

  const handlePlaySong = (index: number): void => {
    playQueue(songs.map(itemToTrack), index)
  }

  const handleRemoveSong = async (itemId?: number): Promise<void> => {
    if (!playlist?.id || itemId === undefined) return
    try {
      await window.api.db.removeItemFromPlaylist(playlist.id, itemId)
      setSongs((prev) => prev.filter((song) => song.id !== itemId))
      onPlaylistChanged()
    } catch (err) {
      console.error('Error removing song from playlist:', err)
    }
  }

  const handleDeletePlaylist = async (): Promise<void> => {
    if (!playlist?.id) return
    const confirmed = window.confirm(`Delete "${playlist.name}"? This cannot be undone.`)
    if (!confirmed) return

    try {
      await window.api.db.deletePlaylist(playlist.id)
      onPlaylistDeleted()
    } catch (err) {
      console.error('Error deleting playlist:', err)
    }
  }

  return (
    <AnimatePresence>
      {playlist && (
        <>
          <Backdrop
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <Panel
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={theme.spring.soft}
          >
            <PanelHeader>
              <HeaderText>
                <PanelTitle>{playlist.name}</PanelTitle>
                {playlist.description && <PanelDescription>{playlist.description}</PanelDescription>}
              </HeaderText>
              <CloseButton
                onClick={onClose}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={theme.spring.snappy}
              >
                <FaTimes size={14} />
              </CloseButton>
            </PanelHeader>

            <ActionsRow>
              <PlayAllButton
                onClick={handlePlayAll}
                disabled={songs.length === 0}
                whileHover={songs.length ? { scale: 1.02 } : undefined}
                whileTap={songs.length ? { scale: 0.98 } : undefined}
                transition={theme.spring.snappy}
              >
                <FaPlay size={12} />
                Play All
              </PlayAllButton>
              <DeleteButton
                onClick={handleDeletePlaylist}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={theme.spring.snappy}
              >
                <FaTrash size={14} />
              </DeleteButton>
            </ActionsRow>

            <SongCount>
              {songs.length} {songs.length === 1 ? 'song' : 'songs'}
            </SongCount>

            {songs.length === 0 ? (
              <EmptySongs>No songs in this playlist yet.</EmptySongs>
            ) : (
              <SongList>
                {songs.map((song, index) => (
                  <SongRow
                    key={song.id ?? index}
                    onClick={() => handlePlaySong(index)}
                    whileHover={{ x: 2 }}
                    transition={theme.spring.snappy}
                  >
                    {song.thumbnail ? (
                      <SongThumbnail src={song.thumbnail} alt="thumbnail" />
                    ) : (
                      <SongThumbnailPlaceholder />
                    )}
                    <SongInfo>
                      <SongTitle>{song.title}</SongTitle>
                      <SongArtist>{song.artist || '—'}</SongArtist>
                    </SongInfo>
                    <RemoveSongButton
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveSong(song.id)
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={theme.spring.snappy}
                    >
                      <FaTrash size={12} />
                    </RemoveSongButton>
                  </SongRow>
                ))}
              </SongList>
            )}
          </Panel>
        </>
      )}
    </AnimatePresence>
  )
}

export default PlaylistDetailPanel
