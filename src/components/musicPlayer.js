// import { useEffect, useRef, useState } from "react"
// import { storage } from "../lib/storage"

// export default function MusicPlayer({ song, onSongEnd }) {
//   const audioRef = useRef(null);
//   const [lastPlayedId, setLastPlayedId] = useState(null);

//   useEffect(() => {
//     if (song && song.id !== lastPlayedId) {
//       storage.addToPlayHistory(song)
//       setLastPlayedId(song.id)
//     }
//   }, [song, lastPlayedId])

//   return (
//     <div className="p-4 border rounded-lg shadow bg-white">
//       <h2 className="font-bold mb-2">{song.title}</h2>
//       <audio
//         ref={audioRef}
//         controls
//         src={song.link || ""}
//         onEnded={onSongEnd}
//         className="w-full"
//       />
//     </div>
//   )
// }

import { useEffect, useRef } from "react"

export default function MusicPlayer({ song, onSongEnd }) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.src = song.audioUrl
      audioRef.current.play().catch(err => console.log("Playback error:", err))
    }
  }, [song])

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md flex flex-col items-center space-y-2">
      {song ? (
        <>
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-40 h-40 object-cover rounded-xl shadow"
          />
          <h2 className="text-lg font-semibold mt-2">{song.title}</h2>
          <p className="text-sm text-gray-500">{song.artist}</p>

          <audio
            ref={audioRef}
            controls
            onEnded={onSongEnd}
            className="w-full mt-2"
          />

        </>
      ) : (
        <p className="text-gray-500">Select a song to play 🎵</p>
      )}
    </div>
  )
}
