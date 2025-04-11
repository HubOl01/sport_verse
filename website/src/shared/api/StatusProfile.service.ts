import { AxiosError } from "axios";
import { ITrainingResult } from "../model/ITrainingResult";
import { apiStatuses } from "../config";
import { api } from ".";
import { IStatusProfile } from "../model/IStatusProfile";

export const StatusProfileService = {
  async getAll(): Promise<IStatusProfile[]> {
    try {
      const response = await api.get<IStatusProfile[]>(apiStatuses);
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
  async getId(id: string): Promise<IStatusProfile> {
    try {
      const response = await api.get<IStatusProfile>(`${apiStatuses}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке статуса профиля";
      throw new Error(message);
    }
  },
  async create(item: ITrainingResult): Promise<IStatusProfile> {
    try {
      const response = await api.post<IStatusProfile>(apiStatuses, item);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при создании нового тренировочного плана";
      throw new Error(message);
    }
  },
  async update(id: number, item: IStatusProfile): Promise<IStatusProfile> {
    try {
      const response = await api.patch<IStatusProfile>(
        `${apiStatuses}/${id}`,
        item
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при изменении тренировочного плана";
      throw new Error(message);
    }
  },
  async delete(id: string): Promise<IStatusProfile> {
    try {
      const response = await api.delete<IStatusProfile>(`${apiStatuses}/${id}`);
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
