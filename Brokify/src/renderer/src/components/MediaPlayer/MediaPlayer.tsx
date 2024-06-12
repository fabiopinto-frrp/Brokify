import { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'
import { useStore } from '../../stores/store'
import { FaPlay, FaPause, FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { IoVolumeMedium } from 'react-icons/io5'
import { MdOutlineRestartAlt } from 'react-icons/md'
import {
  MediaPlayerContainer,
  ImageContainer,
  SliderContainer,
  ButtonContainer,
  Button,
  Slider,
  EmptyImageContainer,
  DurationContainer,
  MediaButtonContainer,
  DurationSlider
} from './MediaPlayerElement'

const MediaPlayer: React.FC = () => {
  const {
    selectedItem,
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

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true)
    }, 4200)
    return () => clearTimeout(visibilityTimer)
  }, [setIsVisible])

  useEffect(() => {
    if (selectedItem) {
      const playTimer = setTimeout(() => {
        setPlaying(true)
      }, 1000)
      return () => clearTimeout(playTimer)
    }
  }, [selectedItem, setPlaying])

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
      return <FaVolumeMute size={20} />
    } else if (volume > 0 && volume <= 40) {
      return <FaVolumeDown size={20} />
    } else if (volume > 40 && volume <= 80) {
      return <IoVolumeMedium size={30} />
    } else if (volume > 80) {
      return <FaVolumeUp size={36} />
    }
    return <FaVolumeMute size={30} />
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
      <MediaPlayerContainer>
        {selectedItem && selectedItem.snippet.thumbnails.default.url ? (
          <ImageContainer>
            <img src={selectedItem.snippet.thumbnails.default.url} alt="thumbnail" />
          </ImageContainer>
        ) : (
          <EmptyImageContainer></EmptyImageContainer>
        )}
        <MediaButtonContainer>
          <ButtonContainer>
            <Button onClick={() => playerRef.current?.seekTo(0)}>
              <MdOutlineRestartAlt size={20} />
            </Button>
            {playing ? (
              <Button onClick={handlePause}>
                <FaPause size={20} />
              </Button>
            ) : (
              <Button onClick={handlePlay}>
                <FaPlay size={20} />
              </Button>
            )}
          </ButtonContainer>
          <DurationContainer>
            <span>{formatDuration(playedSeconds)}</span>
            <DurationSlider
              type="range"
              min="0"
              max={duration}
              value={playedSeconds}
              onChange={handleTimeChange}
            />
            <span>{formatDuration(duration)}</span>
          </DurationContainer>
        </MediaButtonContainer>
        <SliderContainer>
          {getVolumeIcon()}
          <Slider type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} />
        </SliderContainer>

        <ReactPlayer
          ref={playerRef}
          url={`https://www.youtube.com/watch?v=${selectedItem.id.videoId}`}
          playing={playing}
          volume={volume / 100}
          onPlay={handlePlay}
          onPause={handlePause}
          onDuration={(duration) => setDuration(duration)}
          onProgress={({ playedSeconds }) => setPlayedSeconds(playedSeconds)}
          width={0}
          height={0}
          style={{ display: 'none' }}
        />
      </MediaPlayerContainer>
    )
  )
}

export default MediaPlayer
