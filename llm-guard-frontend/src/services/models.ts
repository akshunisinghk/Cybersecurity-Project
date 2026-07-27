import api from "./api";

export interface Model {
  id: string;
  name: string;
  provider: string;
  version: string;
  status: string;
}

export const getModels = async (): Promise<Model[]> => {
  const response = await api.get("/models");
  return response.data;
};