import { AxiosError } from "axios";
import { api } from ".";
import { IJoinRequest } from "../model/IJoinRequest";
import { apiJoinRequests } from "../config/backend";

export const JoinRequestsService = {
  /**
   * Получение всех запросов на присоединение
   */
  async getAll(): Promise<IJoinRequest[]> {
    try {
      const response = await api.get<IJoinRequest[]>(apiJoinRequests);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке всех запросов на присоединение";
      throw new Error(message);
    }
  },

  /**
   * Получение одного запроса по ID
   */
  async get(id: string): Promise<IJoinRequest> {
    try {
      const response = await api.get<IJoinRequest>(`${apiJoinRequests}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при загрузке запроса с ID: ${id}`;
      throw new Error(message);
    }
  },

  /**
   * Отправка запроса на присоединение к группе
   */
  async requestToJoinGroup(groupId: number, athleteId: number): Promise<IJoinRequest> {
    try {
      const response = await api.post<IJoinRequest>(
        `${apiJoinRequests}/groups/${groupId}/join`,
        { athleteId }
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при отправке запроса на присоединение к группе`;
      throw new Error(message);
    }
  },

  /**
   * Обработка запроса тренером (одобрение/отклонение)
   */
  async handleJoinRequest(
    requestId: string,
    status: "approved" | "rejected",
    trainerId: number
  ): Promise<IJoinRequest> {
    try {
      const response = await api.patch<IJoinRequest>(
        `${apiJoinRequests}/${requestId}`,
        { status, trainerId }
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при обработке запроса на присоединение`;
      throw new Error(message);
    }
  },

  /**
   * Удаление запроса
   */
  async delete(id: string): Promise<void> {
    try {
      await api.delete(`${apiJoinRequests}/${id}`);
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении запроса на присоединение";
      throw new Error(message);
    }
  },
};