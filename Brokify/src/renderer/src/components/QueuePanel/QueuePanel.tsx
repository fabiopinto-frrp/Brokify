import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaRandom } from 'react-icons/fa'
import { useStore } from '@renderer/stores/store'
import { theme } from '@renderer/styles/theme'
import {
  ToggleButton,
  Backdrop,
  Panel,
  PanelHeader,
  PanelTitle,
  CloseButton,
  ShuffleButton,
  SongList,
  SongRow,
  SongThumbnail,
  SongThumbnailPlaceholder,
  SongInfo,
  SongTitle,
  SongArtist
} from './QueuePanelElements'

const QueuePanel: React.FC = () => {
  const { queue, queueIndex, jumpToIndex, shuffleQueue } = useStore()
  const [isOpen, setIsOpen] = useState(false)

  if (queue.length === 0) return null

  return (
    <>
      <ToggleButton
        onClick={() => setIsOpen((open) => !open)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={theme.spring.snappy}
        title="Queue"
      >
        <FaBars size={14} />
      </ToggleButton>

      <AnimatePresence>
        {isOpen && (
          <>
            <Backdrop
              onClick={() => setIsOpen(false)}
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
                <PanelTitle>Queue</PanelTitle>
                <CloseButton
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={theme.spring.snappy}
                >
                  <FaTimes size={14} />
                </CloseButton>
              </PanelHeader>

              <ShuffleButton
                onClick={shuffleQueue}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={theme.spring.snappy}
              >
                <FaRandom size={13} />
                Shuffle
              </ShuffleButton>

              <SongList>
                {queue.map((track, index) => (
                  <SongRow
                    key={`${track.videoId}-${index}`}
                    $active={index === queueIndex}
                    onClick={() => jumpToIndex(index)}
                    whileHover={{ x: 2 }}
                    transition={theme.spring.snappy}
                  >
                    {track.thumbnail ? (
                      <SongThumbnail src={track.thumbnail} alt="thumbnail" />
                    ) : (
                      <SongThumbnailPlaceholder />
                    )}
                    <SongInfo>
                      <SongTitle>{track.title}</SongTitle>
                      <SongArtist>{track.artist || '—'}</SongArtist>
                    </SongInfo>
                  </SongRow>
                ))}
              </SongList>
            </Panel>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default QueuePanel
