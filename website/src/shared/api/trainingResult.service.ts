import { AxiosError } from "axios";
import { ITrainingResult } from "../model/ITrainingResult";
import { apiTrainingResults } from "../config";
import { api } from ".";

export const TrainingResultService = {
  async getAll(): Promise<ITrainingResult[]> {
    try {
      const response = await api.get<ITrainingResult[]>(apiTrainingResults);
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
  async create(item: ITrainingResult): Promise<ITrainingResult> {
    try {
      const response = await api.post<ITrainingResult>(
        apiTrainingResults,
        item
      );
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
  async delete(id: string): Promise<ITrainingResult> {
    try {
      const response = await api.delete<ITrainingResult>(`${apiTrainingResults}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении упражнения из плана";
      throw new Error(message);
    }
  }
};
