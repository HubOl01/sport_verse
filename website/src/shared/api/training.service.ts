import  { AxiosError } from "axios";
import { ITraining } from "../model/ITraining";
import { api } from ".";



export const TrainingService = {
  async getAll(): Promise<ITraining[]> {
    try {
      const response = await api.get<ITraining[]>("/training-plans");
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке всех планов";
      throw new Error(message);
    }
  },

  async get(id: string): Promise<ITraining> {
    try {
      const response = await api.get<ITraining>(`/training-plans/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при загрузке плана с ID: ${id}`;
      throw new Error(message);
    }
  },
};
