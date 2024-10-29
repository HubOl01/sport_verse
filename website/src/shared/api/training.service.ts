import axios from "axios"

export const TrainingService = {
    async getAll() {
      const response = await axios.get("http://localhost:4200/tr")
      return response.data
    },
}