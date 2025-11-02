export const storage = {
  getUserProfile: () => JSON.parse(localStorage.getItem("userProfile") || "null"),
  setUserProfile: (profile) => localStorage.setItem("userProfile", JSON.stringify(profile)),
  getPlayHistory: () => JSON.parse(localStorage.getItem("playHistory") || "[]"),
  addToPlayHistory: (song) => {
    /*const history = JSON.parse(localStorage.getItem("playHistory") || "[]")
    history.push(song)
    localStorage.setItem("playHistory", JSON.stringify(history))*/
    let history = JSON.parse(localStorage.getItem("playHistory")) || [];

    // Normalize: ensure every entry is { song, playedAt }
    history = history.map(entry =>
      entry.song ? entry : { song: entry, playedAt: new Date().toISOString() }
    )

    // Check if the song already exists
    const alreadyPlayed = history.some(entry => entry.song.id === song.id)

    const newEntry = { song, playedAt: new Date().toISOString() }

    if (alreadyPlayed) {
      // Update timestamp and move to top
      history = [
        newEntry,
        ...history.filter(entry => entry.song.id !== song.id)
      ]
    } else {
      // Add new song to top
      history = [newEntry, ...history]
    }

    // Save back to localStorage
    storage.save("history", history)
  },
  clearPlayHistory: () => localStorage.removeItem("playHistory"),
  save: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },

  // Load any data
  load: (key) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  },
 }
