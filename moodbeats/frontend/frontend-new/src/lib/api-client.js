export const apiClient = {
  saveProfile: async (userId, profile) => {
    console.log("Saving profile:", userId, profile)
  },
  clearHistory: async (userId) => {
    console.log("Clearing history for:", userId)
  },
}
