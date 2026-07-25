import api from "./api";
import type { FirewallRule } from "../types/firewall";

export const getFirewallRules = async (): Promise<FirewallRule[]> => {
  const response = await api.get("/firewall");
  return response.data;
};