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

const Searchbar: React.FC = () => {
  const {
    searchResults,
    setSearchResults,
    setSearchBarInputValue,
    searchBarInputValue,
    loading,
    setLoading
  } = useStore()

  const ApiKey = 'AIzaSyDyz6cfPb1dcrijDGXm9CCqGf7lixH5REo' //process.env.YOUTUBE_API_KEY

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
          key: ApiKey
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
            <ResultCard key={result.id.videoId}>
              <Thumbnail src={result.snippet.thumbnails.default.url} alt="thumbnail" />
              <VideoTitle>{result.snippet.title}</VideoTitle>
              <ChannelTitle>{result.snippet.channelTitle}</ChannelTitle>
              {/* <Description>{result.snippet.description}</Description> */}
            </ResultCard>
          ))
        )}
      </SearchContainer>
    </>
  )
}

export default Searchbar
