import api from "./api";
import type { Model } from "../types/model";

export const getModels = async (): Promise<Model[]> => {
  const response = await api.get<Model[]>("/models");
  return response.data;
};