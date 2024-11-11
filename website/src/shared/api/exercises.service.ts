import { AxiosError } from "axios";
import { IExercise } from "../model/IExercise";
import { apiExercises } from "../config";
import { api } from ".";

export const ExercisesService = {
  async getAll(): Promise<IExercise[]> {
    try {
      const response = await api.get<IExercise[]>(apiExercises);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке всех тренировочных планов";
      throw new Error(message);
    }
  },

  // async get(id: string): Promise<IExercises> {
  //   try {
  //     const response = await api.get<IExercises>(`/training-plans/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     const err = error as AxiosError;
  //     const message =
  //       typeof err.response?.data === "string"
  //         ? err.response.data
  //         : `Произошла ошибка при загрузке плана с ID: ${id}`;
  //     throw new Error(message);
  //   }
  // },
};
