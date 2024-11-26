import { AxiosError } from "axios";
import { ITraining } from "../model/ITraining";
import { api } from ".";
import { apiTraining, apiTrainingGetIdFirst } from "../config";

export const TrainingService = {
  async getAll(): Promise<ITraining[]> {
    try {
      const response = await api.get<ITraining[]>("/training-plans");
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

  async get(id: string): Promise<ITraining> {
    try {
      const response = await api.get<ITraining>(`/training-plans/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при загрузке плана с ID: ${id}`;
      throw new Error(message);
    }
  },
  async getIdFirst(): Promise<ITraining> {
    try {
      const response = await api.get<ITraining>(apiTrainingGetIdFirst);
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
  async create(training: ITraining): Promise<ITraining> {
    try {
      const response = await api.post<ITraining>(`/training-plans`, training);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при создании нового тренировочного плана`;
      throw new Error(message);
    }
  },
  async delete(id: string): Promise<ITraining> {
    try {
      const response = await api.delete<ITraining>(`${apiTraining}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении тренировочного плана";
      throw new Error(message);
    }
  },
};
