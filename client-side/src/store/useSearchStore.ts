import { create } from 'zustand';

interface SearchStore {
  isOpen: boolean;
  query: string;
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (q: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  isOpen: false,
  query: '',
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '' }),
  setQuery: (q) => set({ query: q }),
}));
