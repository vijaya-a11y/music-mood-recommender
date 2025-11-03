import { useState, useEffect } from "react"
import OnboardingForm from "./components/onboardingForm"
import MoodSelector from "./components/moodSelector"
import SongGrid from "./components/songGrid"
import MusicPlayer from "./components/musicPlayer"
import { MOCK_SONGS, MOODS } from "./lib/mock-data"
import { storage } from "./lib/storage"
import "./App.css"

export default function App() {
  const [user, setUser] = useState(null)
  const [selectedMood, setSelectedMood] = useState(null)
  const [selectedSong, setSelectedSong] = useState(null)
  const [language, setLanguage] = useState("en")

  useEffect(() => {
    const storedUser = storage.load("user")
    if (storedUser) {
      setUser(storedUser)
      setLanguage(storedUser.language || "en")
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setLanguage(userData.language)
  }

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    setSelectedSong(null)
  }

  const translatedMoodName = (mood) =>
    mood.translations?.[language] || mood.name

  const filteredSongs = selectedMood
    ? MOCK_SONGS.filter(
        (song) => song.mood === selectedMood.id && song.language === language
      )
    : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700">
          🎵 Music Mood Recommender
        </h1>
        <div className="flex items-center space-x-2">
          <label className="font-semibold">🌐 Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded-md bg-white shadow-sm"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="te">తెలుగు</option>
          </select>
        </div>
      </header>

      {!user ? (
        <OnboardingForm onSubmit={handleLogin} language={language} />
      ) : (
        <>
          <MoodSelector
            moods={MOODS.map((m) => ({
              ...m,
              name: translatedMoodName(m),
            }))}
            onSelect={handleMoodSelect}
            selectedMood={selectedMood}
          />

          {selectedMood && (
            <SongGrid
              songs={filteredSongs}
              onSongSelect={setSelectedSong}
              selectedSongId={selectedSong?.id}
            />
          )}

          {selectedSong && (
            <MusicPlayer
              song={selectedSong}
              onSongEnd={() => setSelectedSong(null)}
            />
          )}
        </>
      )}
    </div>
  )
}
