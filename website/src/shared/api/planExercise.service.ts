import { AxiosError } from "axios";
import { IPlanExercise } from "../model/IPlanExercise";
import { api } from ".";
import {
  apiPlanExercise,
  apiPlanExerciseAllPlan,
  apiPlanExerciseDeleteAll,
  apiPlanExercisesGetIdFirst,
} from "../config";
import { ExerciseSetService } from "./exerciseSet.service";

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
  async update(
    id: number,
    planExercise: IPlanExercise
  ): Promise<IPlanExercise> {
    try {
      const response = await api.patch<IPlanExercise>(
        `${apiPlanExercise}/${id}`,
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
  async deleteAll(trainingId: string): Promise<IPlanExercise> {
    try {
      const arrExersises = await PlanExerciseService.getAllPlan(
        trainingId.toString()
      );

      for (const item of arrExersises) {
        await ExerciseSetService.deletePlanExercise(item.exerciseId.toString());
      }

      const response = await api.delete<IPlanExercise>(
        `${apiPlanExerciseDeleteAll}/${trainingId}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении всех упражнений из одного плана";
      throw new Error(message);
    }
  },
};
