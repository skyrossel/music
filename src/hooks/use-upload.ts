import { create } from 'zustand'

interface UploadStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useUpload = create<UploadStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
