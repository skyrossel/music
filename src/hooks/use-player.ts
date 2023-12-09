import { create } from 'zustand'

interface PlayerStore {
  ids: string[]
  activeId?: string
  setIds: (ids: string[]) => void
  setId: (id: string) => void
  reset: () => void
}

export const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setIds: (ids: string[]) => set({ ids: ids }),
  setId: (id: string) => set({ activeId: id }),
  reset: () => set({ ids: [], activeId: undefined }),
}))
