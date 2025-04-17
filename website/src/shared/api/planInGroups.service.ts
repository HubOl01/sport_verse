import { AxiosError } from "axios";
import { api } from ".";
import { IPlanInGroup } from "../model/IPlanInGroup";
import { apiPlanInGroups } from "../config";

export const PlanInGroupService = {
  async getAll(): Promise<IPlanInGroup[]> {
    try {
      const response = await api.get<IPlanInGroup[]>(apiPlanInGroups);
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

  async get(id: string): Promise<IPlanInGroup> {
    try {
      const response = await api.get<IPlanInGroup>(`${apiPlanInGroups}/${id}`);
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
  async create(model: IPlanInGroup): Promise<IPlanInGroup> {
    try {
      const response = await api.post<IPlanInGroup>(apiPlanInGroups, model);
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
  async update(id: string, model: IPlanInGroup): Promise<IPlanInGroup> {
    try {
      const response = await api.patch<IPlanInGroup>(
        `${apiPlanInGroups}/${id}`,
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
  async delete(id: string): Promise<IPlanInGroup> {
    try {
      const response = await api.delete<IPlanInGroup>(
        `${apiPlanInGroups}/${id}`
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
