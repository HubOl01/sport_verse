import { AxiosError } from "axios";
import { api } from ".";
import { apiAthleteInGroups } from "../config";
import { PlanExerciseService } from "./planExercise.service";
import { IAthleteInGroup } from "../model/IAthleteInGroup";

export const AthleteInGroupService = {
  async getAll(): Promise<IAthleteInGroup[]> {
    try {
      const response = await api.get<IAthleteInGroup[]>(apiAthleteInGroups);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке всех AthleteInGroup";
      throw new Error(message);
    }
  },

  async get(id: string): Promise<IAthleteInGroup> {
    try {
      const response = await api.get<IAthleteInGroup>(
        `${apiAthleteInGroups}/${id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при загрузке AthleteInGroup с ID: ${id}`;
      throw new Error(message);
    }
  },
  async create(model: IAthleteInGroup): Promise<IAthleteInGroup> {
    try {
      const response = await api.post<IAthleteInGroup>(
        apiAthleteInGroups,
        model
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при создании AthleteInGroup`;
      throw new Error(message);
    }
  },
  async update(id: string, model: IAthleteInGroup): Promise<IAthleteInGroup> {
    try {
      const response = await api.patch<IAthleteInGroup>(
        `${apiAthleteInGroups}/${id}`,
        model
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при изменении AthleteInGroup`;
      throw new Error(message);
    }
  },
  async delete(id: string): Promise<IAthleteInGroup> {
    try {
      await PlanExerciseService.deleteAll(id);
      const response = await api.delete<IAthleteInGroup>(
        `${apiAthleteInGroups}/${id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении AthleteInGroup";
      throw new Error(message);
    }
  },
};
