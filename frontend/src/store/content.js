// for the tv shows and movies
import { create } from 'zustand'

// this is for the sliders for the movies and tv shows
export const useContentStore = create((set) => ({
    contentType: "movie",
    setContentType: (type) => set({contentType: type}),
})) 