import api from "./api";
import type { Alert } from "../types/alert";

export const getAlerts = async (): Promise<Alert[]> => {
  const response = await api.get("/alerts");
  return response.data;
};