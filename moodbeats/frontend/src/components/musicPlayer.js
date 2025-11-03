import { useRef, useEffect } from "react"

export default function MusicPlayer({ song, onSongEnd }) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }, [song])

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md mt-6 text-center">
      <h2 className="font-bold text-lg mb-2">{song.title}</h2>
      <p className="text-sm text-gray-500 mb-3">{song.artist}</p>
      <audio
        ref={audioRef}
        src={song.audioUrl}
        controls
        onEnded={onSongEnd}
        className="w-full"
      />
    </div>
  )
}
