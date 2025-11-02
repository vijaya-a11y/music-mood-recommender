import { useState } from "react"
import Button from "./ui/button"
import Card from "./ui/card"
import { PROFESSIONS, INTERESTS } from "../lib/mock-data"
import { storage } from "../lib/storage"
import './styles.css'

export default function OnboardingForm({ onComplete }) {
  const [step, setStep] = useState(1)
  const [profession, setProfession] = useState("")
  const [selectedInterests, setSelectedInterests] = useState([])
  const [language, setLanguage] = useState("en")

  const handleInterestToggle = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    )
  }

  const handleComplete = () => {
    const profile = {
      id: Date.now().toString(),
      profession,
      interests: selectedInterests,
      favoriteGenres: [],
      language,
      createdAt: new Date(),
    }
    storage.setUserProfile(profile)
    onComplete(profile)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to MoodBeats</h1>

        {step === 1 && (
          <>
            <p className="mb-4">Select your profession:</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {PROFESSIONS.map((prof) => (
                <button
                  key={prof}
                  onClick={() => setProfession(prof)}
                  className={`p-3 border rounded-lg ${
                    profession === prof ? "bg-blue-100" : ""
                  }`}
                >
                  {prof}
                </button>
              ))}
            </div>
            <Button onClick={() => setStep(2)} disabled={!profession} className="next-button">
              Next
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="mb-4">Select at least 3 interests:</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 border rounded-lg ${
                    selectedInterests.includes(interest) ? "bg-green-100" : ""
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            <Button
              onClick={() => setStep(3)}
              disabled={selectedInterests.length < 3}
              className="next-button"
            >
              Next
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="mb-4">Choose your language:</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {["en", "hi", "te"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`p-3 border rounded-lg ${
                    language === lang ? "bg-yellow-100" : ""
                  }`}
                >
                  {lang === "en" && "English"}
                  {lang === "hi" && "Hindi"}
                  {lang === "te" && "Telugu"}
                </button>
              ))}
            </div>
            <Button onClick={handleComplete} className="next-button">Get Started</Button>
          </>
        )}
      </Card>
    </div>
  )
}
