import Card from "./ui/card"
import Button from './ui/button'

export default function HistoryView({ history, onSongSelect, onClear }) {

  if (!history.length) return <p>No songs played yet.</p>

  return (
    <>
      <h1 className="text-xl font-bold mb-6 text-purple-700">Your Recent Plays...🎵</h1>
      <Button onClick={onClear}>Clear Play History</Button>
      <div className="grid grid-cols-4 gap-3">
      {history.map((item, i) => (
        <Card key={i} onClick={() => onSongSelect(item)} className="cursor-pointer">
          <h3>{item.song.title}</h3>
          <p className="text-sm text-gray-500">{item.song.artist}</p>
        </Card>
      ))}
      
    </div>
    </>
  )
}
