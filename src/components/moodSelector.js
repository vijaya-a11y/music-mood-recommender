import { MOODS } from "../lib/mock-data"

export default function MoodSelector({ selectedMood, onMoodSelect, language }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {MOODS.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onMoodSelect(mood.id)}
          className={`p-6 rounded-xl transition-all ${
            selectedMood === mood.id
              ? `${mood.color} shadow-lg scale-105`
              : "bg-gray-100 hover:scale-105 hover:bg-[#FFE799] tansition duration-300 hover:border-[#C5C5E0]"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl">{mood.icon}</span>
            <span className="text-sm font-semibold text-center">
              {mood.translations[language] || mood.name}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}
