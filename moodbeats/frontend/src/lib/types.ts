export interface Song {
  id: string
  title: string
  artist: string
  mood: string
  language: string
  link?: string
}

export interface UserProfile {
  id: string
  profession: string
  interests: string[]
  favoriteGenres: string[]
  language: string
  createdAt: Date
}
