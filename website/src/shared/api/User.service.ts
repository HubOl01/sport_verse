import { AxiosError } from "axios";
import { apiUsers, apiUsersUserName } from "../config";
import { api } from ".";
import { IUser } from "../model/IUser";

export const UserService = {
  async getAll(): Promise<IUser[]> {
    try {
      const response = await api.get<IUser[]>(apiUsers);
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
  async getUsername(username: string): Promise<IUser> {
    try {
      const response = await api.get<IUser>(`${apiUsersUserName}/${username}`);
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
  async get(id: string): Promise<IUser> {
    try {
      const response = await api.get<IUser>(`${apiUsers}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке пользователя";
      throw new Error(message);
    }
  },
  async create(item: IUser): Promise<IUser> {
    try {
      const response = await api.post<IUser>(apiUsers, item);
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
  async update(id: number, item: IUser): Promise<IUser> {
    try {
      const response = await api.patch<IUser>(`${apiUsers}/${id}`, item);
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
  async delete(id: string): Promise<IUser> {
    try {
      const response = await api.delete<IUser>(`${apiUsers}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении пользователя";
      throw new Error(message);
    }
  },
};
