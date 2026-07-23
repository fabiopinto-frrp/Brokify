import Sidebar from '@renderer/components/SideBar/Sidebar'
import TitleBar from '@renderer/components/TitleBar/TitleBar'
import { useState, useEffect } from 'react'
import {
  PlaylistsContainer,
  PlaylistsContent,
  PageTitle,
  PlaylistsGrid,
  PlaylistCard,
  PlaylistCardTitle,
  PlaylistCardDescription,
  PlaylistCardSongCount,
  AddPlaylistIcon,
  AddPlaylistText,
  EmptyState,
  EmptyStateTitle,
  EmptyStateText
} from './PlaylistsElement'
import CreatePlaylistModal from './CreatePlaylistModal'
import PlaylistDetailPanel from '@renderer/components/PlaylistDetail/PlaylistDetailPanel'
import { Playlist } from '@shared/types'
import { theme } from '@renderer/styles/theme'

const Playlists: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null)

  useEffect(() => {
    loadPlaylists()
  }, [])

  const loadPlaylists = async (): Promise<void> => {
    try {
      const allPlaylists = await window.api.db.getAllPlaylists()
      setPlaylists(allPlaylists)
    } catch (err) {
      console.error('Error loading playlists:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePlaylistCreated = (_playlistId: number): void => {
    loadPlaylists()
  }

  const handlePlaylistChanged = (): void => {
    loadPlaylists()
  }

  const handlePlaylistDeleted = (): void => {
    setSelectedPlaylist(null)
    loadPlaylists()
  }

  return (
    <>
      <TitleBar />
      <PlaylistsContainer>
        <Sidebar />
        <PlaylistsContent>
          <PageTitle>My Playlists</PageTitle>

          {loading ? (
            <div>Loading playlists...</div>
          ) : playlists.length === 0 ? (
            <EmptyState onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
              <AddPlaylistIcon>+</AddPlaylistIcon>
              <EmptyStateTitle>No Playlists Yet</EmptyStateTitle>
              <EmptyStateText>Create your first playlist to get started!</EmptyStateText>
            </EmptyState>
          ) : (
            <PlaylistsGrid>
              <PlaylistCard
                isAddCard
                onClick={() => setIsModalOpen(true)}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={theme.spring.soft}
              >
                <AddPlaylistIcon>+</AddPlaylistIcon>
                <AddPlaylistText>Create Playlist</AddPlaylistText>
              </PlaylistCard>

              {playlists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  onClick={() => setSelectedPlaylist(playlist)}
                  whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(143, 149, 204, 0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={theme.spring.soft}
                >
                  <PlaylistCardTitle>{playlist.name}</PlaylistCardTitle>
                  {playlist.description && (
                    <PlaylistCardDescription>{playlist.description}</PlaylistCardDescription>
                  )}
                  <PlaylistCardSongCount>{playlist.items.length} songs</PlaylistCardSongCount>
                </PlaylistCard>
              ))}
            </PlaylistsGrid>
          )}
        </PlaylistsContent>
      </PlaylistsContainer>

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPlaylistCreated={handlePlaylistCreated}
      />

      <PlaylistDetailPanel
        playlist={selectedPlaylist}
        onClose={() => setSelectedPlaylist(null)}
        onPlaylistChanged={handlePlaylistChanged}
        onPlaylistDeleted={handlePlaylistDeleted}
      />
    </>
  )
}

export default Playlists
