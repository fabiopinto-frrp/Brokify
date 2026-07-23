import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormGroup,
  Label,
  Input,
  Textarea,
  ButtonGroup,
  Button
} from './PlaylistsElement'
import { theme } from '@renderer/styles/theme'
interface CreatePlaylistModalProps {
  isOpen: boolean
  onClose: () => void
  onPlaylistCreated: (playlistId: number) => void
}

const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({ isOpen, onClose, onPlaylistCreated }) => {
  const [playlistName, setPlaylistName] = useState('')
  const [playlistDescription, setPlaylistDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    if (!playlistName.trim()) {
      setError('Playlist name is required')
      return
    }

    try {
      setLoading(true)
      setError('')

      const playlistId = await window.api.db.createPlaylist({
        name: playlistName.trim(),
        description: playlistDescription.trim(),
        items: []
      })

      setPlaylistName('')
      setPlaylistDescription('')
      setLoading(false)
      onPlaylistCreated(playlistId)
      onClose()
    } catch (err) {
      console.error('Error creating playlist:', err)
      setError('Failed to create playlist')
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
            <ModalHeader>Create New Playlist</ModalHeader>

            {error && (
              <div style={{ color: '#ff6b6b', marginBottom: '16px', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="playlist-name">Playlist Name *</Label>
                <Input
                  id="playlist-name"
                  type="text"
                  placeholder="Enter playlist name"
                  value={playlistName}
                  onChange={(e) => {
                    setPlaylistName(e.target.value)
                    setError('')
                  }}
                  disabled={loading}
                  autoFocus
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="playlist-description">Description (Optional)</Label>
                <Textarea
                  id="playlist-description"
                  placeholder="Add a description for your playlist"
                  value={playlistDescription}
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                  disabled={loading}
                />
              </FormGroup>

              <ButtonGroup>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  disabled={loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={theme.spring.snappy}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={theme.spring.snappy}
                >
                  {loading ? 'Creating...' : 'Create Playlist'}
                </Button>
              </ButtonGroup>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  )
}

export default CreatePlaylistModal
