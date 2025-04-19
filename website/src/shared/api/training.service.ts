import { AxiosError } from "axios";
import { ITraining } from "../model/ITraining";
import { api } from ".";
import {
  apiTraining,
  apiTrainingGetIdFirst,
  apiTrainingPrivate,
  apiTrainingPublic,
} from "../config";
import { PlanExerciseService } from "./planExercise.service";
import { apiTrainingCheck, apiTrainingCopy } from "../config/backend";

export const TrainingService = {
  async getAll(): Promise<ITraining[]> {
    try {
      const response = await api.get<ITraining[]>(apiTraining);
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
  async getAllUser(idUser: number): Promise<ITraining[]> {
    try {
      const response = await api.get<ITraining[]>(
        `${apiTrainingPrivate}/${idUser}`
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
  async getAllPublic(): Promise<ITraining[]> {
    try {
      const response = await api.get<ITraining[]>(apiTrainingPublic);
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
  async getAllPublicUser(idUser: string): Promise<ITraining[]> {
    try {
      const response = await api.get<ITraining[]>(
        `${apiTrainingPublic}/${idUser}`
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
  async apiTrainingCheck(
    parentGroupId: string,
    parentPlanInGroupId: string,
    originalPlanId: string,
    targetUserId: string
  ): Promise<ITraining> {
    try {
      const response = await api.get<ITraining>(
        `${apiTrainingCheck}/${parentGroupId}/${parentPlanInGroupId}/${originalPlanId}/${targetUserId}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при просмотре копии`;
      throw new Error(message);
    }
  },

  async copy(
    parentGroupId: string,
    parentPlanInGroupId: string,
    originalPlanId: string,
    targetUserId: string
  ): Promise<ITraining> {
    try {
      const response = await api.post<ITraining>(
        `${apiTrainingCopy}/${parentGroupId}/${parentPlanInGroupId}/${originalPlanId}/${targetUserId}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при создании копии тренировочного плана`;
      throw new Error(message);
    }
  },
  async update(
    trainingPlanId: number,
    training: ITraining
  ): Promise<ITraining> {
    try {
      const response = await api.patch<ITraining>(
        `/training-plans/${trainingPlanId}`,
        training
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при изменении тренировочного плана`;
      throw new Error(message);
    }
  },
  async delete(id: string): Promise<ITraining> {
    try {
      await PlanExerciseService.deleteAll(id);
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
