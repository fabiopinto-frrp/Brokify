import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useStore } from '../../stores/store'
import { FaPlay, FaPause, FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { IoVolumeMedium } from 'react-icons/io5'
import { MdSkipNext, MdSkipPrevious, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { theme } from '@renderer/styles/theme'
import {
  MediaPlayerDock,
  MediaPlayerContainer,
  PlayerHeaderRow,
  CollapseToggle,
  CollapsedRow,
  ControlsRow,
  NowPlayingSection,
  ImageContainer,
  TrackInfo,
  TrackTitle,
  TrackArtist,
  TransportControls,
  VolumeSection,
  Button,
  PlayButton,
  Slider,
  EmptyImageContainer,
  ProgressRow,
  DurationSlider
} from './MediaPlayerElement'

const sliderFill = (percent: number): React.CSSProperties => ({
  background: `linear-gradient(to right, ${theme.color.accent} ${percent}%, rgba(255, 255, 255, 0.14) ${percent}%)`
})

const MediaPlayer: React.FC = () => {
  const {
    currentTrack,
    playNext,
    playPrevious,
    volume,
    setVolume,
    playing,
    setPlaying,
    duration,
    setDuration,
    playedSeconds,
    setPlayedSeconds,
    isVisible,
    setIsVisible
  } = useStore()
  const playerRef = useRef<ReactPlayer>(null)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true)
    }, 4200)
    return () => clearTimeout(visibilityTimer)
  }, [setIsVisible])

  const handlePlay = (): void => {
    setPlaying(true)
  }

  const handlePause = (): void => {
    setPlaying(false)
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newVolume = parseInt(event.target.value, 10)
    setVolume(newVolume)
  }

  const getVolumeIcon = (): JSX.Element => {
    if (volume === 0) {
      return <FaVolumeMute size={16} />
    } else if (volume > 0 && volume <= 40) {
      return <FaVolumeDown size={16} />
    } else if (volume > 40 && volume <= 80) {
      return <IoVolumeMedium size={18} />
    } else if (volume > 80) {
      return <FaVolumeUp size={18} />
    }
    return <FaVolumeMute size={16} />
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newTime = parseFloat(event.target.value)
    setPlayedSeconds(newTime)
    playerRef.current?.seekTo(newTime)
  }

  const formatDuration = (seconds): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`
  }

  return (
    isVisible && (
      <MediaPlayerDock>
        <MediaPlayerContainer
          layout
          $collapsed={collapsed}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        >
          {!collapsed && (
            <PlayerHeaderRow>
              <CollapseToggle
                onClick={() => setCollapsed(true)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                title="Collapse player"
              >
                <MdKeyboardArrowDown size={20} />
              </CollapseToggle>
            </PlayerHeaderRow>
          )}

          {collapsed ? (
            <CollapsedRow>
              <NowPlayingSection>
                {currentTrack?.thumbnail ? (
                  <ImageContainer $compact>
                    <img src={currentTrack.thumbnail} alt="thumbnail" />
                  </ImageContainer>
                ) : (
                  <EmptyImageContainer $compact></EmptyImageContainer>
                )}
                <TrackInfo>
                  <TrackTitle>{currentTrack?.title || 'No track selected'}</TrackTitle>
                </TrackInfo>
              </NowPlayingSection>

              {playing ? (
                <PlayButton
                  $compact
                  onClick={handlePause}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                >
                  <FaPause size={12} />
                </PlayButton>
              ) : (
                <PlayButton
                  $compact
                  onClick={handlePlay}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                >
                  <FaPlay size={12} style={{ position: 'relative', left: 1 }} />
                </PlayButton>
              )}

              <CollapseToggle
                onClick={() => setCollapsed(false)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                title="Expand player"
                style={{ marginLeft: 'auto' }}
              >
                <MdKeyboardArrowUp size={20} />
              </CollapseToggle>
            </CollapsedRow>
          ) : (
            <>
              <ControlsRow>
                <NowPlayingSection>
                  {currentTrack?.thumbnail ? (
                    <ImageContainer>
                      <img src={currentTrack.thumbnail} alt="thumbnail" />
                    </ImageContainer>
                  ) : (
                    <EmptyImageContainer></EmptyImageContainer>
                  )}
                  <TrackInfo>
                    <TrackTitle>{currentTrack?.title || 'No track selected'}</TrackTitle>
                    <TrackArtist>{currentTrack?.artist || '—'}</TrackArtist>
                  </TrackInfo>
                </NowPlayingSection>

                <TransportControls>
                  <Button
                    onClick={playPrevious}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  >
                    <MdSkipPrevious size={20} />
                  </Button>
                  {playing ? (
                    <PlayButton
                      onClick={handlePause}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    >
                      <FaPause size={14} />
                    </PlayButton>
                  ) : (
                    <PlayButton
                      onClick={handlePlay}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    >
                      <FaPlay size={14} style={{ position: 'relative', left: 1 }} />
                    </PlayButton>
                  )}
                  <Button
                    onClick={playNext}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  >
                    <MdSkipNext size={20} />
                  </Button>
                </TransportControls>

                <VolumeSection>
                  {getVolumeIcon()}
                  <Slider
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    style={sliderFill(volume)}
                  />
                </VolumeSection>
              </ControlsRow>

              <ProgressRow>
                <span>{formatDuration(playedSeconds)}</span>
                <DurationSlider
                  type="range"
                  min="0"
                  max={duration}
                  value={playedSeconds}
                  onChange={handleTimeChange}
                  style={sliderFill(duration > 0 ? (playedSeconds / duration) * 100 : 0)}
                />
                <span>{formatDuration(duration)}</span>
              </ProgressRow>
            </>
          )}

          {currentTrack && (
            <ReactPlayer
              ref={playerRef}
              url={`https://www.youtube.com/watch?v=${currentTrack.videoId}`}
              playing={playing}
              volume={volume / 100}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={playNext}
              onDuration={(newDuration) => setDuration(newDuration)}
              onProgress={({ playedSeconds }) => {
                setPlayedSeconds(playedSeconds)
                if (!duration) {
                  const liveDuration = playerRef.current?.getDuration()
                  if (liveDuration) setDuration(liveDuration)
                }
              }}
              progressInterval={500}
              width={0}
              height={0}
              style={{ display: 'none' }}
            />
          )}
        </MediaPlayerContainer>
      </MediaPlayerDock>
    )
  )
}

export default MediaPlayer
