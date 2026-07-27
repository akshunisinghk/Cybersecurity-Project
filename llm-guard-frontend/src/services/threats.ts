import api from "./api";

export const getThreats = async () => {
  const response = await api.get("/Threats");
  return response.data;
};