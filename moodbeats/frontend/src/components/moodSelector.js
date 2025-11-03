export default function MoodSelector({ moods, onSelect, selectedMood }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onSelect(mood)}
          className={`p-4 rounded-2xl shadow-md bg-gradient-to-br ${mood.color} text-white font-semibold transition transform hover:scale-105 ${
            selectedMood?.id === mood.id ? "ring-4 ring-indigo-500" : ""
          }`}
        >
          <span className="text-3xl">{mood.icon}</span>
          <p>{mood.name}</p>
        </button>
      ))}
    </div>
  )
}
