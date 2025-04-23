import { AxiosError } from "axios";
import { api } from ".";
import { apiViewsTraining } from "../config/backend";
import { IViewModel } from "../model/IViewModel";

export const ViewsTrainingService = {
  async create(item: IViewModel): Promise<IViewModel> {
    try {
      const response = await api.post<IViewModel>(apiViewsTraining, item);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      const message =
        typeof err.response?.data === "string"
          ? err.response.data
          : "Произошла ошибка при создании просмотра плана";
      throw new Error(message);
    }
  },
};
