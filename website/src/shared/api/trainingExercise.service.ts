import { AxiosError } from "axios";
import { IPlanExercise } from "../model/IPlanExercise";
import { api } from ".";
import { apiPlanExercise } from "../config";

export const TrainingExerciseService = {
  async getAll(): Promise<IPlanExercise[]> {
    try {
      const response = await api.get<IPlanExercise[]>(apiPlanExercise);
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
  async create(planExercise: IPlanExercise): Promise<IPlanExercise> {
    try {
      const response = await api.post<IPlanExercise>(apiPlanExercise, planExercise);
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
