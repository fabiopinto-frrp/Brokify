import axios from 'axios'
import { useStore } from '../../stores/store'
import {
  SearchBarElement,
  SearchBarInput,
  SearchBarButton,
  SearchBarIcon,
  SearchContainer,
  SearchStatus,
  ResultCard,
  Thumbnail,
  VideoTitle,
  ChannelTitle,
  ResultCardButtonContainer,
  AddToPlaylistButton
} from './SearchbarElements'
import { AiOutlineSearch } from 'react-icons/ai'
const { ipcRenderer } = require('electron')
import { useEffect, useState } from 'react'
import AddToPlaylistModal from '../AddToPlaylistModal/AddToPlaylistModal'
import { theme } from '@renderer/styles/theme'

type Video = {
  id: {
    videoId: string
  }
  snippet: {
    title: string
    description: string
    thumbnails: {
      default: {
        url: string
      }
    }
    channelTitle: string
    publishTime: string
  }
}

function requestEnvVariable(): void {
  ipcRenderer.send('getEnvVariable')
}

const Searchbar: React.FC = (): JSX.Element => {
  const {
    searchResults,
    setSearchResults,
    setSearchBarInputValue,
    searchBarInputValue,
    loading,
    setLoading,
    apiKey,
    setApiKey,
    playQueue
  } = useStore()

  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false)
  const [selectedSongForPlaylist, setSelectedSongForPlaylist] = useState<{
    id: string
    title: string
    channelTitle: string
    url: string
    thumbnail: string
  } | null>(null)
  const [searchError, setSearchError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    window.api.db.getYoutubeApiKey().then((dbApiKey) => {
      if (dbApiKey) {
        setApiKey(dbApiKey)
      } else if (!apiKey) {
        requestEnvVariable()
        ipcRenderer.on('envVariable', (_, envVariableValue) => {
          setApiKey(envVariableValue)
        })
      }
    })

    return () => {
      ipcRenderer.removeAllListeners('envVariable')
    }
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchBarInputValue(event.target.value)
  }

  const handleSearch = async (): Promise<void> => {
    if (!searchBarInputValue.trim()) return

    const currentApiKey = (await window.api.db.getYoutubeApiKey()) || apiKey
    if (!currentApiKey) {
      setSearchError('No YouTube API key configured. Add one in Settings.')
      return
    }

    setLoading(true)
    setSearchError('')
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: `${searchBarInputValue} music`,
          type: 'video',
          videoCategoryId: '10',
          key: currentApiKey
        }
      })
      setSearchBarInputValue('')
      setSearchResults(response.data)
      setHasSearched(true)
    } catch (error) {
      console.error('Error fetching data: ', error)
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error?.message || error.message
        : 'Something went wrong while searching.'
      setSearchError(message)
      setHasSearched(true)
    } finally {
      setLoading(false)
    }
  }
  const handleItemClick = (item: Video): void => {
    const tracks = searchResults.items.map((video: Video) => ({
      videoId: video.id.videoId,
      title: video.snippet.title,
      artist: video.snippet.channelTitle,
      thumbnail: video.snippet.thumbnails.default.url
    }))
    const startIndex = searchResults.items.findIndex(
      (video: Video) => video.id.videoId === item.id.videoId
    )
    playQueue(tracks, Math.max(0, startIndex))
  }

  const handleAddToPlaylist = (item: Video): void => {
    const youtubeVideoId = item.id.videoId
    const videoUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`

    setSelectedSongForPlaylist({
      id: youtubeVideoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      url: videoUrl,
      thumbnail: item.snippet.thumbnails.default.url
    })
    setIsPlaylistModalOpen(true)
  }
  return (
    <>
      <SearchBarElement id="search-bar">
        <SearchBarInput
          className="searchBarInput"
          placeholder="Search for a song."
          value={searchBarInputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
          }}
        />
        <SearchBarButton
          onClick={handleSearch}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={theme.spring.snappy}
        >
          <SearchBarIcon>
            <AiOutlineSearch />
          </SearchBarIcon>
        </SearchBarButton>
      </SearchBarElement>
      <SearchContainer id="search-bar">
        {loading ? (
          <SearchStatus>Loading...</SearchStatus>
        ) : searchError ? (
          <SearchStatus>{searchError}</SearchStatus>
        ) : hasSearched && searchResults.items.length === 0 ? (
          <SearchStatus>No results found.</SearchStatus>
        ) : (
          searchResults.items.map((result: Video) => (
            <ResultCard
              key={result.id.videoId}
              whileHover={{ y: -6, borderColor: 'rgba(143, 149, 204, 0.35)' }}
              transition={theme.spring.soft}
            >
              <Thumbnail src={result.snippet.thumbnails.default.url} alt="thumbnail" />
              <VideoTitle>{result.snippet.title}</VideoTitle>
              <ChannelTitle>{result.snippet.channelTitle}</ChannelTitle>
              <ResultCardButtonContainer>
                <AddToPlaylistButton
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToPlaylist(result)
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={theme.spring.snappy}
                >
                  + Playlist
                </AddToPlaylistButton>
                <AddToPlaylistButton
                  onClick={(e) => {
                    e.stopPropagation()
                    handleItemClick(result)
                  }}
                  style={{ background: 'rgba(255, 255, 255, 0.08)', color: theme.color.text }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={theme.spring.snappy}
                >
                  Play
                </AddToPlaylistButton>
              </ResultCardButtonContainer>
            </ResultCard>
          ))
        )}
      </SearchContainer>
      <AddToPlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => {
          setIsPlaylistModalOpen(false)
          setSelectedSongForPlaylist(null)
        }}
        songData={selectedSongForPlaylist}
      />
    </>
  )
}

export default Searchbar
