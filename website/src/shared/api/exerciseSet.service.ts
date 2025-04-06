import { AxiosError } from "axios";
import {
  apiExerciseSets,
  apiExerciseSetsFindAllPlanExercises,
  apiExerciseSetsRemovePlanExercise,
} from "../config";
import { api } from ".";
import { IExerciseSet } from "../model/IExerciseSet";

export const ExerciseSetService = {
  async get(id: string): Promise<IExerciseSet> {
    try {
      const response = await api.get<IExerciseSet>(`${apiExerciseSets}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке плана";
      throw new Error(message);
    }
  },

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
  async getOnePlanExercises(planExerciseId: number): Promise<IExerciseSet> {
    try {
      const response = await api.get<IExerciseSet>(
        `${apiExerciseSetsFindAllPlanExercises}/${planExerciseId}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке плана для упражнения";
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
  async update(id: number, item: IExerciseSet): Promise<IExerciseSet> {
    try {
      const response = await api.patch<IExerciseSet>(
        `${apiExerciseSets}/${id}`,
        item
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при изменении всех планов";
      throw new Error(message);
    }
  },
  async delete(id: string): Promise<IExerciseSet> {
    try {
      const response = await api.delete<IExerciseSet>(
        `${apiExerciseSets}/${id}`
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
  async deletePlanExercise(planExerciseId: string): Promise<IExerciseSet> {
    try {
      const response = await api.delete<IExerciseSet>(
        `${apiExerciseSetsRemovePlanExercise}/${planExerciseId}`
      );
      console.log("Response:", response);
      console.log(`id=${planExerciseId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении упражнения из плана по id из упражнения плана";
      throw new Error(message);
    }
  },
};
