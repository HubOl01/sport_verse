import { AxiosError } from "axios";
import { ITrainingResult } from "../model/ITrainingResult";
import { apiTrainingResults } from "../config";
import { api } from ".";
import {
  apiTrainingResultsFinal,
  apiTrainingResultsStart,
  apiTrainingResultsStartPlan,
  apiTrainingResultsUser,
} from "../config/backend";

export const TrainingResultService = {
  async getAll(): Promise<ITrainingResult[]> {
    try {
      const response = await api.get<ITrainingResult[]>(apiTrainingResults);
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
  async findAllStartingUser(userId: string): Promise<ITrainingResult[]> {
    try {
      const response = await api.get<ITrainingResult[]>(
        `${apiTrainingResultsStart}/${userId}`
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
  async findStartingUserPlan(
    userId: string,
    planId: string
  ): Promise<ITrainingResult> {
    try {
      const response = await api.get<ITrainingResult>(
        `${apiTrainingResultsStartPlan}/${userId}/${planId}`
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
  async findAllStoppingUser(userId: string): Promise<ITrainingResult[]> {
    try {
      const response = await api.get<ITrainingResult[]>(
        `${apiTrainingResultsFinal}/${userId}`
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
  async findAllUser(userId: string): Promise<ITrainingResult> {
    try {
      const response = await api.get<ITrainingResult>(
        `${apiTrainingResultsUser}/${userId}`
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
  async getId(id: string): Promise<ITrainingResult[]> {
    try {
      const response = await api.get<ITrainingResult[]>(
        `${apiTrainingResults}/${id}`
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
  async create(item: ITrainingResult): Promise<ITrainingResult> {
    try {
      const response = await api.post<ITrainingResult>(
        apiTrainingResults,
        item
      );
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
  async update(id: number, item: ITrainingResult): Promise<ITrainingResult> {
    try {
      const response = await api.patch<ITrainingResult>(
        `${apiTrainingResults}/${id}`,
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
  async delete(id: string): Promise<ITrainingResult> {
    try {
      const response = await api.delete<ITrainingResult>(
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
