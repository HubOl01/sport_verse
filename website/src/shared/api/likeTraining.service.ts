import { AxiosError } from "axios";
import { apiLike, apiLikeCount } from "../config";
import { api } from ".";
import { ILikeModel } from "../model/ILikeModel";
import { apiLikeCountUser, apiLikeUser } from "../config/backend";

export const LikeTrainingService = {
  async getAll(): Promise<ILikeModel[]> {
    try {
      const response = await api.get<ILikeModel[]>(apiLike);
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
  async getPlanUser(idPlan: string, idUser: string): Promise<ILikeModel> {
    try {
      const response = await api.get<ILikeModel>(
        `${apiLike}/training/${idPlan}/user/${idUser}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке get";
      throw new Error(message);
    }
  },
  async getUser(idUser: string): Promise<ILikeModel[]> {
    try {
      const response = await api.get<ILikeModel[]>(`${apiLikeUser}/${idUser}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке get";
      throw new Error(message);
    }
  },
  async getCount(idPlan: string): Promise<number> {
    try {
      const response = await api.get<number>(`${apiLikeCount}/${idPlan}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке count";
      throw new Error(message);
    }
  },
  async getCountUser(idUser: string): Promise<number> {
    try {
      const response = await api.get<number>(`${apiLikeCountUser}/${idUser}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке count user";
      throw new Error(message);
    }
  },
  async create(item: ILikeModel): Promise<ILikeModel> {
    try {
      const response = await api.post<ILikeModel>(apiLike, item);
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
  async deletePlanUser(idPlan: string, idUser: string): Promise<ILikeModel> {
    try {
      const response = await api.delete<ILikeModel>(
        `${apiLike}/training/${idPlan}/user/${idUser}`
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
