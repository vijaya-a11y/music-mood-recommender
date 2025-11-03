import { useState } from "react"
import Button from "./ui/button"
import Card from "./ui/card"
import { PROFESSIONS, INTERESTS } from "../lib/mock-data"
import { storage } from "../lib/storage"

export default function OnboardingForm({ onSubmit, language }) {
  const [step, setStep] = useState(1)
  const [profession, setProfession] = useState("")
  const [selectedInterests, setSelectedInterests] = useState([])

  const handleInterestToggle = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    )
  }

  const handleComplete = () => {
    const userData = {
      id: Date.now(),
      profession,
      interests: selectedInterests,
      language,
    }
    storage.save("user", userData)
    onSubmit(userData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome</h1>

        {step === 1 && (
          <>
            <p className="mb-3">Select your profession:</p>
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
            <div className="flex justify-center">
              <Button onClick={() => setStep(2)} disabled={!profession}>
                Next
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="mb-3">Select at least 3 interests:</p>
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
            <div className="flex justify-center">
              <Button
                onClick={handleComplete}
                disabled={selectedInterests.length < 3}
              >
                Get Started
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
