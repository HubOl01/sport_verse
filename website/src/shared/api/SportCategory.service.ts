import { AxiosError } from "axios";
import { api } from ".";
import { apiSportCategories } from "../config/index";
import { ISportCategory } from "../model/ISportCategory";

export const SportCategoryService = {
  async getAll(): Promise<ISportCategory[]> {
    try {
      const response = await api.get<ISportCategory[]>(apiSportCategories);
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

  async get(id: string): Promise<ISportCategory> {
    try {
      const response = await api.get<ISportCategory>(`${apiSportCategories}/${id}`);
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

  // async getName(name: string): Promise<IRoleProfile> {
  //   try {
  //     const response = await api.get<IRoleProfile>(`${apiRoles}/${name}`);
  //     return response.data;
  //   } catch (error) {
  //     const err = error as AxiosError;
  //     const message =
  //       typeof err.response?.data === "string"
  //         ? err.response.data
  //         : `Произошла ошибка при загрузке плана с ID: ${name}`;
  //     throw new Error(message);
  //   }
  // },

  async create(model: ISportCategory): Promise<ISportCategory> {
    try {
      const response = await api.post<ISportCategory>(apiSportCategories, model);
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
  async update(id: number, model: ISportCategory): Promise<ISportCategory> {
    try {
      const response = await api.patch<ISportCategory>(
        `${apiSportCategories}/${id}`,
        model
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
  async delete(id: string): Promise<ISportCategory> {
    try {
      const response = await api.delete<ISportCategory>(`${apiSportCategories}/${id}`);
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
