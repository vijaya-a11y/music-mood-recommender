import { useState, useEffect } from "react"
import OnboardingForm from "./components/onboardingForm"
import MoodSelector from "./components/moodSelector"
import MusicPlayer from "./components/musicPlayer"
import SongGrid from "./components/songGrid"
import HistoryView from "./components/historyView"
import { MOCK_SONGS } from "./lib/mock-data"
import { storage } from "./lib/storage"
import "./App.css"
import "../src/components/styles.css"

function App() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)
  const [selectedMood, setSelectedMood] = useState("")
  const [selectedSong, setSelectedSong] = useState(null)
  const [history, setHistory] = useState([])

  // When onboarding completes
  const handleOnboardingComplete = () => {
    setIsOnboardingComplete(true)
  }

  // When a mood is selected
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
  }

  // When a song is played
  const handleSongSelect = (song) => {
    setSelectedSong(song)
    const newHistory = [
      { song, playedAt: new Date().toISOString() },
      ...history,
    ]
    setHistory(newHistory)
    storage.save("playHistory", newHistory)
  }

  const handleHistoryClear = () => {
    storage.clearPlayHistory('playHistory');
    setHistory([]);
  }

  // Load history when app starts
  useEffect(() => {
    const savedHistory = storage.load("playHistory") || []
    setHistory(savedHistory)
  }, [])

  return (
    <div className="min-h-screen p-6 from-blue-100 to-purple-200 text-center bg-custom-card">
      {!isOnboardingComplete ? (
        <OnboardingForm onComplete={handleOnboardingComplete} />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-purple-700">
            🎵 MoodBeats – Music Mood Recommender
          </h1>

          <MoodSelector onMoodSelect={handleMoodSelect} />

          {selectedMood && (
            <>
              <h2 className="text-xl font-semibold mt-6 mb-4">
                Recommended Songs for {selectedMood} mood
              </h2>
              <SongGrid
                songs={MOCK_SONGS.filter((s) => s.mood === selectedMood)}
                onSongSelect={handleSongSelect}
              />
            </>
          )}

          {selectedSong && (
            <div className="mt-8 flex justify-center">
              <MusicPlayer song={selectedSong} />
            </div>
          )}

          <div className="mt-10">
            <HistoryView history={history} onSongSelect={handleSongSelect} onClear={handleHistoryClear} />
          </div>
        </>
      )}
    </div>
  )
}

export default App

