import create from 'zustand'

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

type State = {
  hovering: string
  setHovering: (value: string) => void
  loading: boolean
  setLoading: (value: boolean) => void
  searchResults: YouTubeSearchResponse
  setSearchResults: (value: YouTubeSearchResponse) => void
  setSearchBarInputValue: (value: string) => void
  searchBarInputValue: string
  apiKey: string
  setApiKey: (value: string) => void
  selectedItem: Video
  setSelectedItem: (value: Video) => void
  streamUrl: string
  setStreamUrl: (value: string) => void
  volume: number
  setVolume: (volume: number) => void
  playing: boolean
  setPlaying: (playing: boolean) => void
  duration: number
  setDuration: (duration: number) => void
  playedSeconds: number
  setPlayedSeconds: (playedSeconds: number) => void
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
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
  searchBarInputValue: '',
  apiKey: '',
  setApiKey: (value: string): void => set(() => ({ apiKey: value })),
  selectedItem: {
    id: {
      videoId: ''
    },
    snippet: {
      title: '',
      description: '',
      thumbnails: {
        default: {
          url: ''
        }
      },
      channelTitle: '',
      publishTime: ''
    }
  },
  setSelectedItem: (value: Video): void => set(() => ({ selectedItem: value })),
  streamUrl: '',
  setStreamUrl: (value: string): void => set(() => ({ streamUrl: value })),
  volume: 50,
  playing: false,
  setVolume: (volume: number): void => set(() => ({ volume })),
  setPlaying: (playing: boolean): void => set(() => ({ playing })),
  duration: 0,
  setDuration: (duration: number): void => set(() => ({ duration })),
  playedSeconds: 0,
  setPlayedSeconds: (playedSeconds: number): void => set(() => ({ playedSeconds })),
  isVisible: false,
  setIsVisible: (isVisible: boolean): void => set(() => ({ isVisible: isVisible }))
}))
