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

export type Track = {
  videoId: string
  title: string
  artist: string
  thumbnail: string
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
  queue: Track[]
  queueIndex: number
  currentTrack: Track | null
  playQueue: (tracks: Track[], startIndex?: number) => void
  playNext: () => void
  playPrevious: () => void
  jumpToIndex: (index: number) => void
  shuffleQueue: () => void
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
export const useStore = create<State>((set, get) => ({
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
  queue: [],
  queueIndex: 0,
  currentTrack: null,
  playQueue: (tracks: Track[], startIndex = 0): void =>
    set(() => ({
      queue: tracks,
      queueIndex: startIndex,
      currentTrack: tracks[startIndex] ?? null,
      playing: true,
      isVisible: true,
      playedSeconds: 0,
      duration: 0
    })),
  playNext: (): void => {
    const { queue, queueIndex } = get()
    const nextIndex = queueIndex + 1
    if (nextIndex >= queue.length) {
      set(() => ({ playing: false }))
      return
    }
    set(() => ({
      queueIndex: nextIndex,
      currentTrack: queue[nextIndex],
      playing: true,
      playedSeconds: 0,
      duration: 0
    }))
  },
  playPrevious: (): void => {
    const { queue, queueIndex } = get()
    const prevIndex = queueIndex - 1
    if (prevIndex < 0) return
    set(() => ({
      queueIndex: prevIndex,
      currentTrack: queue[prevIndex],
      playing: true,
      playedSeconds: 0,
      duration: 0
    }))
  },
  jumpToIndex: (index: number): void => {
    const { queue } = get()
    if (index < 0 || index >= queue.length) return
    set(() => ({
      queueIndex: index,
      currentTrack: queue[index],
      playing: true,
      playedSeconds: 0,
      duration: 0
    }))
  },
  shuffleQueue: (): void => {
    const { queue, queueIndex } = get()
    if (queue.length < 2) return
    const current = queue[queueIndex]
    const rest = queue.filter((_, i) => i !== queueIndex)
    for (let i = rest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[rest[i], rest[j]] = [rest[j], rest[i]]
    }
    set(() => ({ queue: [current, ...rest], queueIndex: 0 }))
  },
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
