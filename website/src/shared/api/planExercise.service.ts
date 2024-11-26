import { AxiosError } from "axios";
import { IPlanExercise } from "../model/IPlanExercise";
import { api } from ".";
import {
  apiPlanExercise,
  apiPlanExerciseAllPlan,
  apiPlanExercisesGetIdFirst,
} from "../config";

export const PlanExerciseService = {
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

  async getIdFirst(): Promise<IPlanExercise> {
    try {
      const response = await api.get<IPlanExercise>(apiPlanExercisesGetIdFirst);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при загрузке плана с getIdFirst`;
      throw new Error(message);
    }
  },

  async getAllPlan(id: string): Promise<IPlanExercise[]> {
    try {
      const response = await api.get<IPlanExercise[]>(
        `${apiPlanExerciseAllPlan}/${id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке всех планов от getAllPlan";
      throw new Error(message);
    }
  },

  async create(planExercise: IPlanExercise): Promise<IPlanExercise> {
    try {
      const response = await api.post<IPlanExercise>(
        apiPlanExercise,
        planExercise
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
  async delete(id: string): Promise<IPlanExercise> {
    try {
      const response = await api.delete<IPlanExercise>(
        `${apiPlanExercise}/${id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении упражнения из плана";
      throw new Error(message);
    }
  },
};
