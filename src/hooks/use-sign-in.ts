import { create } from 'zustand'

interface SignInStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSignIn = create<SignInStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
