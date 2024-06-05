import create from 'zustand'

type State = {
  hovering: string
  setHovering: (value: string) => void
}

export const useStore = create<State>((set) => ({
  hovering: '',
  setHovering: (value: string): void => set(() => ({ hovering: value }))
}))
