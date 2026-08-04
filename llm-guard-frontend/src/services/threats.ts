import api from "./api";

export const getThreats = async () => {
  const response = await api.get("/threats");
  return response.data;
};