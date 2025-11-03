import Card from "./ui/card"

export default function SongGrid({ songs, onSongSelect, selectedSongId }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {songs.map((song) => (
        <Card
          key={song.id}
          onClick={() => onSongSelect(song)}
          className={`cursor-pointer transition-all ${
            selectedSongId === song.id ? "ring-2 ring-blue-600" : ""
          }`}
        >
          <div className="flex flex-row">
            <img
              src={song.imageUrl}
              className="rounded-full size-14 mr-2"
              alt="song"
            />
            <div className="flex flex-col ml-2">
              <h3 className="font-semibold">{song.title}</h3>
              <p className="text-sm text-gray-500">{song.artist}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
