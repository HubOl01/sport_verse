import { AxiosError } from "axios";
import { api } from ".";
import { apiNews } from "../config";
import { PlanExerciseService } from "./planExercise.service";
import { INewModel } from "../model/INewModel";

export const NewsService = {
  async getAll(): Promise<INewModel[]> {
    try {
      const response = await api.get<INewModel[]>(apiNews);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке всех новостей";
      throw new Error(message);
    }
  },

  async get(id: string): Promise<INewModel> {
    try {
      const response = await api.get<INewModel>(`${apiNews}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при загрузке новости с ID: ${id}`;
      throw new Error(message);
    }
  },
  async create(news: INewModel): Promise<INewModel> {
    try {
      const response = await api.post<INewModel>(apiNews, news);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при создании новости`;
      throw new Error(message);
    }
  },
  async update(id: string, news: INewModel): Promise<INewModel> {
    try {
      const response = await api.patch<INewModel>(`${apiNews}/${id}`, news);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при изменении новости`;
      throw new Error(message);
    }
  },
  async delete(id: string): Promise<INewModel> {
    try {
      await PlanExerciseService.deleteAll(id);
      const response = await api.delete<INewModel>(`${apiNews}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении новости";
      throw new Error(message);
    }
  },
};
