import { AxiosError } from "axios";
import { api } from ".";
import { apiCommentTraining, apiCommentTrainingCount } from "../config";
import { ICommentModel } from "../model/ICommentModel";
import { apiComment } from '../config/index';


export const CommentPlanService = {
  async getAll(): Promise<ICommentModel[]> {
    try {
      const response = await api.get<ICommentModel[]>(apiComment);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке всех комментарий";
      throw new Error(message);
    }
  },
  async getAllPlanId(id: string): Promise<ICommentModel[]> {
    try {
      const response = await api.get<ICommentModel[]>(`${apiCommentTraining}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке всех комментарий для одного плана";
      throw new Error(message);
    }
  },
  async getAllPlanIdCount(id: string): Promise<number> {
    try {
      const response = await api.get<number>(`${apiCommentTrainingCount}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при подсчете комментариев";
      throw new Error(message);
    }
  },

  async get(id: string): Promise<ICommentModel> {
    try {
      const response = await api.get<ICommentModel>(`${apiComment}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при загрузке комментария с ID: ${id}`;
      throw new Error(message);
    }
  },
  async create(model: ICommentModel): Promise<ICommentModel> {
    try {
      const response = await api.post<ICommentModel>(apiComment, model);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при создании комментария`;
      throw new Error(message);
    }
  },
  async update(id: string, model: ICommentModel): Promise<ICommentModel> {
    try {
      const response = await api.patch<ICommentModel>(`${apiComment}/${id}`, model);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при изменении комментария`;
      throw new Error(message);
    }
  },
  async delete(id: string): Promise<ICommentModel> {
    try {
      const response = await api.delete<ICommentModel>(`${apiComment}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении комментария";
      throw new Error(message);
    }
  },
};
