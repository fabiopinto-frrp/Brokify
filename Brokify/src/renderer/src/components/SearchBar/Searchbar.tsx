import axios from 'axios'
import { useStore } from '../../stores/store'
import {
  SearchBarElement,
  SearchBarInput,
  SearchBarButton,
  SearchBarIcon,
  SearchContainer,
  ResultCard,
  Thumbnail,
  VideoTitle,
  ChannelTitle
} from './SearchbarElements'
import { AiOutlineSearch } from 'react-icons/ai'
const { ipcRenderer } = require('electron')
import { useEffect } from 'react'

function requestEnvVariable(): void {
  ipcRenderer.send('getEnvVariable')
}

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
    //selectedItem,
    setSelectedItem
  } = useStore()

  useEffect(() => {
    requestEnvVariable()
    ipcRenderer.on('envVariable', (_, envVariableValue) => {
      setApiKey(envVariableValue)
    })

    return () => {
      ipcRenderer.removeAllListeners('envVariable')
    }
  }, [])

  //const ApiKey = 'AIzaSyDyz6cfPb1dcrijDGXm9CCqGf7lixH5REo'

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchBarInputValue(event.target.value)
  }

  const handleSearch = async (): Promise<void> => {
    if (!searchBarInputValue.trim()) return
    setLoading(true)
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: `${searchBarInputValue} music`,
          type: 'video',
          videoCategoryId: '10',
          key: apiKey
        }
      })
      setSearchBarInputValue('')
      setSearchResults(response.data)
    } catch (error) {
      console.error('Error fetching data: ', error)
    } finally {
      setLoading(false)
    }
  }
  const handleItemClick = (item: Video): void => {
    console.log('Item clicked:', item)

    setSelectedItem(item)
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
        <SearchBarButton onClick={handleSearch}>
          <SearchBarIcon>
            <AiOutlineSearch />
          </SearchBarIcon>
        </SearchBarButton>
      </SearchBarElement>
      <SearchContainer id="search-bar">
        {loading ? (
          <div>Loading...</div>
        ) : (
          searchResults.items.map((result: Video) => (
            <ResultCard key={result.id.videoId} onClick={() => handleItemClick(result)}>
              <Thumbnail src={result.snippet.thumbnails.default.url} alt="thumbnail" />
              <VideoTitle>{result.snippet.title}</VideoTitle>
              <ChannelTitle>{result.snippet.channelTitle}</ChannelTitle>
            </ResultCard>
          ))
        )}
      </SearchContainer>
    </>
  )
}

export default Searchbar
