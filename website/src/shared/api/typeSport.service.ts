import { AxiosError } from "axios";
import { api } from ".";
import { ISportType } from "../model/ISportType";
import { apiSportTypes } from "../config/index";

export const TypeSportService = {
  async getAll(): Promise<ISportType[]> {
    try {
      const response = await api.get<ISportType[]>(apiSportTypes);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке всех видов спорта";
      throw new Error(message);
    }
  },

  async get(id: string): Promise<ISportType> {
    try {
      const response = await api.get<ISportType>(`${apiSportTypes}/${id}`);
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

  async getName(name: string): Promise<ISportType> {
    try {
      const response = await api.get<ISportType>(`${apiSportTypes}/${name}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при загрузке плана с ID: ${name}`;
      throw new Error(message);
    }
  },

  async create(sportType: ISportType): Promise<ISportType> {
    try {
      const response = await api.post<ISportType>(apiSportTypes, sportType);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при создании вида спорта";
      throw new Error(message);
    }
  },
  async update(id: number, sportType: ISportType): Promise<ISportType> {
    try {
      const response = await api.patch<ISportType>(
        `${apiSportTypes}/${id}`,
        sportType
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при изменении вида спорта";
      throw new Error(message);
    }
  },
  async delete(id: string): Promise<ISportType> {
    try {
      const response = await api.delete<ISportType>(`${apiSportTypes}/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении вида спорта";
      throw new Error(message);
    }
  },
};
