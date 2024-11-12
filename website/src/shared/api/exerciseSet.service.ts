import { AxiosError } from "axios";
import { apiExerciseSets } from "../config";
import { api } from ".";
import { IExerciseSet } from "../model/IExerciseSet";

export const ExerciseSetService = {
  async getAll(): Promise<IExerciseSet[]> {
    try {
      const response = await api.get<IExerciseSet[]>(apiExerciseSets);
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
  async create(item: IExerciseSet): Promise<IExerciseSet> {
    try {
      const response = await api.post<IExerciseSet>(apiExerciseSets, item);
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
};
