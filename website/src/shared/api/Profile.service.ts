import { AxiosError } from "axios";
import { ITrainingResult } from "../model/ITrainingResult";
import { apiProfile, apiTrainingResults } from "../config";
import { api } from ".";
import { IProfile } from "../model/IProfile";

export const ProfileService = {
  async getAll(): Promise<IProfile[]> {
    try {
      const response = await api.get<IProfile[]>(apiProfile);
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
  async getOne(id: string): Promise<IProfile> {
    try {
      const response = await api.get<IProfile>(`${apiProfile}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке юзернейма";
      throw new Error(message);
    }
  },
  async create(item: ITrainingResult): Promise<IProfile> {
    try {
      const response = await api.post<IProfile>(apiProfile, item);
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
  async update(id: number, item: IProfile): Promise<IProfile> {
    try {
      const response = await api.patch<IProfile>(`${apiProfile}/${id}`, item);
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
  async delete(id: string): Promise<IProfile> {
    try {
      const response = await api.delete<IProfile>(
        `${apiTrainingResults}/${id}`
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
