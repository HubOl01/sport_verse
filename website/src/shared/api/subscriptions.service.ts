import { AxiosError } from "axios";
import { api } from ".";
import { apiSubscription } from "../config";
import { ISubscription } from "../model/ISubscription";

export const SubscriptionService = {
  async getAll(): Promise<ISubscription[]> {
    try {
      const response = await api.get<ISubscription[]>(apiSubscription);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке всех Subscription";
      throw new Error(message);
    }
  },

  async get(id: string): Promise<ISubscription> {
    try {
      const response = await api.get<ISubscription>(`${apiSubscription}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при загрузке Subscription с ID: ${id}`;
      throw new Error(message);
    }
  },
  async create(model: ISubscription): Promise<ISubscription> {
    try {
      const response = await api.post<ISubscription>(apiSubscription, model);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при создании Subscription`;
      throw new Error(message);
    }
  },
  async update(id: string, model: ISubscription): Promise<ISubscription> {
    try {
      const response = await api.patch<ISubscription>(`${apiSubscription}/${id}`, model);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при изменении Subscription`;
      throw new Error(message);
    }
  },
  async delete(subscriberId: string, subscribedToId: string): Promise<ISubscription> {
    try {
      const response = await api.delete<ISubscription>(`${apiSubscription}/${subscriberId}/${subscribedToId}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении Subscription";
      throw new Error(message);
    }
  },
};
