import { useEffect, useState } from "react"
import { storage } from "../lib/storage"

export default function HistoryView({ language }) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const h = storage.getPlayHistory()
    setHistory(h || [])
  }, [])

  const translations = {
    en: { noHistory: "No songs played yet." },
    hi: { noHistory: "अभी तक कोई गीत नहीं चलाया गया।" },
    te: { noHistory: "ఇప్పటికీ ఎటువంటి పాటలు ప్లే చేయబడలేదు." },
  }

  const text = translations[language] || translations.en

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      {history.length === 0 ? (
        <p className="text-center text-gray-600">{text.noHistory}</p>
      ) : (
        <ul className="space-y-2">
          {history.map((song, index) => (
            <li
              key={index}
              className="p-2 border rounded-lg flex justify-between items-center"
            >
              <span>{song.title}</span>
              <span className="text-sm text-gray-500">{song.artist}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
