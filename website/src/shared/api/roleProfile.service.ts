import { AxiosError } from "axios";
import { api } from ".";
import { apiRoles } from "../config/index";
import { IRoleProfile } from "../model/IRoleProfile";

export const RoleProfileService = {
  async getAll(): Promise<IRoleProfile[]> {
    try {
      const response = await api.get<IRoleProfile[]>(apiRoles);
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

  async get(id: string): Promise<IRoleProfile> {
    try {
      const response = await api.get<IRoleProfile>(`${apiRoles}/${id}`);
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

  async create(roleProfile: IRoleProfile): Promise<IRoleProfile> {
    try {
      const response = await api.post<IRoleProfile>(apiRoles, roleProfile);
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
  async update(id: number, roleProfile: IRoleProfile): Promise<IRoleProfile> {
    try {
      const response = await api.patch<IRoleProfile>(
        `${apiRoles}/${id}`,
        roleProfile
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
  async delete(id: string): Promise<IRoleProfile> {
    try {
      const response = await api.delete<IRoleProfile>(`${apiRoles}/${id}`);
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
