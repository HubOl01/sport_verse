import { AxiosError } from "axios";
import { api } from ".";
import { PlanExerciseService } from "./planExercise.service";
import { apiTrainingGroups } from "../config";
import { ITrainingGroup } from "../model/ITrainingGroup";

export const TrainingGroupService = {
  async getAll(): Promise<ITrainingGroup[]> {
    try {
      const response = await api.get<ITrainingGroup[]>(apiTrainingGroups);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке всех TrainingGroup";
      throw new Error(message);
    }
  },

  async get(id: string): Promise<ITrainingGroup> {
    try {
      const response = await api.get<ITrainingGroup>(
        `${apiTrainingGroups}/${id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при загрузке TrainingGroup с ID: ${id}`;
      throw new Error(message);
    }
  },
  async create(model: ITrainingGroup): Promise<ITrainingGroup> {
    try {
      const response = await api.post<ITrainingGroup>(apiTrainingGroups, model);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при создании TrainingGroup`;
      throw new Error(message);
    }
  },
  async update(id: string, model: ITrainingGroup): Promise<ITrainingGroup> {
    try {
      const response = await api.patch<ITrainingGroup>(
        `${apiTrainingGroups}/${id}`,
        model
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при изменении TrainingGroup`;
      throw new Error(message);
    }
  },
  async delete(id: string): Promise<ITrainingGroup> {
    try {
      await PlanExerciseService.deleteAll(id);
      const response = await api.delete<ITrainingGroup>(
        `${apiTrainingGroups}/${id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении TrainingGroup";
      throw new Error(message);
    }
  },
};
