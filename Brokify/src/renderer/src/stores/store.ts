import create from 'zustand'

// Define types for the YouTube API response
type Thumbnail = {
  url: string
  width: number
  height: number
}

type Snippet = {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: {
    default: Thumbnail
    medium: Thumbnail
    high: Thumbnail
  }
  channelTitle: string
  liveBroadcastContent: string
  publishTime: string
}

type VideoId = {
  kind: string
  videoId: string
}

type SearchResultItem = {
  kind: string
  etag: string
  id: VideoId
  snippet: Snippet
}

type YouTubeSearchResponse = {
  kind: string
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: SearchResultItem[]
}

// Update the State type
type State = {
  hovering: string
  setHovering: (value: string) => void
  loading: boolean
  setLoading: (value: boolean) => void
  searchResults: YouTubeSearchResponse // Updated to use YouTubeSearchResponse type
  setSearchResults: (value: YouTubeSearchResponse) => void // Updated to accept YouTubeSearchResponse
  setSearchBarInputValue: (value: string) => void
  searchBarInputValue: string
}

// Update the useStore definition
export const useStore = create<State>((set) => ({
  hovering: '',
  setHovering: (value: string): void => set(() => ({ hovering: value })),
  loading: false,
  setLoading: (value: boolean): void => set(() => ({ loading: value })),
  searchResults: {
    kind: '',
    etag: '',
    nextPageToken: '',
    regionCode: '',
    pageInfo: { totalResults: 0, resultsPerPage: 0 },
    items: []
  }, // Initialize with default values
  setSearchResults: (value: YouTubeSearchResponse): void => set(() => ({ searchResults: value })),
  setSearchBarInputValue: (value: string): void => set(() => ({ searchBarInputValue: value })),
  searchBarInputValue: ''
}))
