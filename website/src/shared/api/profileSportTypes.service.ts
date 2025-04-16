import { AxiosError } from "axios";
import { api } from ".";
import { IProfileSportType } from "../model/IProfileSportType";
import { apiProfileSportTypes } from "../config";

export const ProfileSportTypesService = {
  async getAll(): Promise<IProfileSportType[]> {
    try {
      const response = await api.get<IProfileSportType[]>(apiProfileSportTypes);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при загрузке всех ProfileSportType";
      throw new Error(message);
    }
  },

  async get(id: string): Promise<IProfileSportType> {
    try {
      const response = await api.get<IProfileSportType>(
        `${apiProfileSportTypes}/${id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при загрузке ProfileSportType с ID: ${id}`;
      throw new Error(message);
    }
  },
  async create(model: IProfileSportType): Promise<IProfileSportType> {
    try {
      const response = await api.post<IProfileSportType>(
        apiProfileSportTypes,
        model
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при создании ProfileSportType`;
      throw new Error(message);
    }
  },
  async update(
    id: string,
    model: IProfileSportType
  ): Promise<IProfileSportType> {
    try {
      const response = await api.patch<IProfileSportType>(
        `${apiProfileSportTypes}/${id}`,
        model
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : `Произошла ошибка при изменении ProfileSportType`;
      throw new Error(message);
    }
  },
  async delete(id: string): Promise<IProfileSportType> {
    try {
      const response = await api.delete<IProfileSportType>(
        `${apiProfileSportTypes}/${id}`
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при удалении ProfileSportType";
      throw new Error(message);
    }
  },
};
