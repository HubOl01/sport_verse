import axios from "axios";

export const TrainingService = {
  async getAll() {
    const response = await axios.get(`http://localhost:3000/training-plans`);
    return response.data;
  },
};
