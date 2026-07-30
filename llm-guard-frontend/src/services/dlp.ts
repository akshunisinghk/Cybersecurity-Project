import api from "./api";
import type { DLPEvent } from "../types/dlp";

export const getDLPEvents = async (): Promise<DLPEvent[]> => {
  const response = await api.get("/dlp");
  return response.data;
};