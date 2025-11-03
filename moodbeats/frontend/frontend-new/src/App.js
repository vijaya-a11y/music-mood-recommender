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
  const [page, setPage] = useState("login") // 'login', 'register', 'onboarding', 'main'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  })
  const [selectedMood, setSelectedMood] = useState("")
  const [selectedSong, setSelectedSong] = useState(null)
  const [history, setHistory] = useState([])

  // 🧠 Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // ✅ Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        alert("Registration successful! Please login.")
        setPage("login")
      } else {
        alert(data.message || "Registration failed")
      }
    } catch (err) {
      console.error("Error registering user:", err)
    }
  }

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        alert("Login successful!")
        localStorage.setItem("user", JSON.stringify(data.user))
        setPage("onboarding")
      } else {
        alert(data.message || "Login failed")
      }
    } catch (err) {
      console.error("Login error:", err)
    }
  }

  // ✅ Onboarding complete
  const handleOnboardingComplete = () => {
    setPage("main")
  }

  // ✅ Handle mood select
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
  }

  // ✅ Handle song select
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
    storage.clearPlayHistory("playHistory")
    setHistory([])
  }

  useEffect(() => {
    const savedHistory = storage.load("playHistory") || []
    setHistory(savedHistory)
  }, [])

  // ✅ Login Page
  if (page === "login") {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-lg w-96"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">
            Login to MoodBeats 🎵
          </h1>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer font-semibold"
              onClick={() => setPage("register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    )
  }

  // ✅ Registration Page
  if (page === "register") {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-2xl shadow-lg w-96"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">
            Register for MoodBeats 🎶
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter a password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
          >
            Register
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer font-semibold"
              onClick={() => setPage("login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    )
  }

  // ✅ Onboarding Page
  if (page === "onboarding") {
    return <OnboardingForm onComplete={handleOnboardingComplete} />
  }

  // ✅ Main Mood Recommender
  return (
    <div className="min-h-screen p-6 from-blue-100 to-purple-200 text-center bg-custom-card">
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
        <HistoryView
          history={history}
          onSongSelect={handleSongSelect}
          onClear={handleHistoryClear}
        />
      </div>
    </div>
  )
}

export default App
