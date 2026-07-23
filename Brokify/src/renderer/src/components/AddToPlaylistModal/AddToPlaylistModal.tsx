import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { theme } from '@renderer/styles/theme'
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  PlaylistsList,
  PlaylistCard,
  PlaylistName,
  PlaylistItemCount,
  EmptyState,
  CreatePlaylistForm,
  FormLabel,
  FormInput,
  FormTextarea,
  ButtonGroup,
  Button,
  AddButton,
  SongPreview,
  PreviewTitle,
  PreviewValue
} from './AddToPlaylistModalElements'
import { Playlist } from '@shared/types'

interface AddToPlaylistModalProps {
  isOpen: boolean
  onClose: () => void
  songData: {
    id: string
    title: string
    channelTitle: string
    url: string
    thumbnail: string
  } | null
}

const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({ isOpen, onClose, songData }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      loadPlaylists()
    }
  }, [isOpen])

  const loadPlaylists = async (): Promise<void> => {
    try {
      const allPlaylists = await window.api.db.getAllPlaylists()
      setPlaylists(allPlaylists)
      setShowCreateForm(allPlaylists.length === 0)
      setError('')
    } catch (err) {
      console.error('Error loading playlists:', err)
      setError('Failed to load playlists')
    }
  }

  const handleAddToPlaylist = async (playlistId: number): Promise<void> => {
    if (!songData) return

    try {
      setLoading(true)
      await window.api.db.addItemToPlaylist(playlistId, {
        title: songData.title,
        url: songData.url,
        artist: songData.channelTitle,
        thumbnail: songData.thumbnail,
        duration: 0
      })
      setLoading(false)
      onClose()
    } catch (err) {
      console.error('Error adding to playlist:', err)
      setError('Failed to add song to playlist')
      setLoading(false)
    }
  }

  const handleCreatePlaylist = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!newPlaylistName.trim()) {
      setError('Playlist name is required')
      return
    }

    try {
      setLoading(true)
      const newPlaylistId = await window.api.db.createPlaylist({
        name: newPlaylistName,
        description: newPlaylistDescription,
        items: []
      })

      if (songData) {
        await window.api.db.addItemToPlaylist(newPlaylistId, {
          title: songData.title,
          url: songData.url,
          artist: songData.channelTitle,
          thumbnail: songData.thumbnail,
          duration: 0
        })
      }

      setNewPlaylistName('')
      setNewPlaylistDescription('')
      setLoading(false)
      onClose()
    } catch (err) {
      console.error('Error creating playlist:', err)
      setError('Failed to create playlist')
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && songData && (
        <ModalOverlay
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={theme.spring.snappy}
          >
            <ModalHeader>Add to Playlist</ModalHeader>

            <SongPreview>
              <PreviewTitle>Selected Song</PreviewTitle>
              <PreviewValue>{songData.title}</PreviewValue>
              <PreviewTitle style={{ marginTop: '10px' }}>Artist</PreviewTitle>
              <PreviewValue>{songData.channelTitle}</PreviewValue>
            </SongPreview>

            {error && <EmptyState style={{ color: '#ff6b6b' }}>{error}</EmptyState>}

            {!showCreateForm && playlists.length > 0 && (
              <>
                <PlaylistsList>
                  {playlists.map((playlist) => (
                    <PlaylistCard
                      key={playlist.id}
                      onClick={() => handleAddToPlaylist(playlist.id!)}
                      whileHover={{ x: 4, borderColor: 'rgba(143, 149, 204, 0.4)' }}
                      whileTap={{ scale: 0.98 }}
                      transition={theme.spring.snappy}
                    >
                      <PlaylistName>{playlist.name}</PlaylistName>
                      <PlaylistItemCount>{playlist.items.length} songs</PlaylistItemCount>
                    </PlaylistCard>
                  ))}
                </PlaylistsList>
                <Button
                  variant="secondary"
                  onClick={() => setShowCreateForm(true)}
                  style={{ width: '100%' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={theme.spring.snappy}
                >
                  Create New Playlist
                </Button>
              </>
            )}

            {(showCreateForm || playlists.length === 0) && (
              <CreatePlaylistForm onSubmit={handleCreatePlaylist}>
                <div>
                  <FormLabel htmlFor="playlist-name">Playlist Name</FormLabel>
                  <FormInput
                    id="playlist-name"
                    type="text"
                    placeholder="Enter playlist name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div>
                  <FormLabel htmlFor="playlist-description">Description (Optional)</FormLabel>
                  <FormTextarea
                    id="playlist-description"
                    placeholder="Add a description for your playlist"
                    value={newPlaylistDescription}
                    onChange={(e) => setNewPlaylistDescription(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <ButtonGroup>
                  {showCreateForm && playlists.length > 0 && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setShowCreateForm(false)}
                      disabled={loading}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={theme.spring.snappy}
                    >
                      Cancel
                    </Button>
                  )}
                  <AddButton
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={theme.spring.snappy}
                  >
                    {loading ? 'Creating...' : 'Create & Add Song'}
                  </AddButton>
                </ButtonGroup>
              </CreatePlaylistForm>
            )}

            {playlists.length === 0 && !showCreateForm && (
              <EmptyState>No playlists yet. Create one to add songs!</EmptyState>
            )}

            <ButtonGroup style={{ marginTop: '20px' }}>
              <Button
                variant="secondary"
                onClick={onClose}
                style={{ width: '100%' }}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={theme.spring.snappy}
              >
                Close
              </Button>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  )
}

export default AddToPlaylistModal
