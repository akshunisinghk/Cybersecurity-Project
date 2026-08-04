import api from "./api";
import type { SettingSection } from "../types/settings";

export const getSettings = async (): Promise<SettingSection[]> => {
  const response = await api.get<SettingSection[]>("/settings");
  return response.data;
};