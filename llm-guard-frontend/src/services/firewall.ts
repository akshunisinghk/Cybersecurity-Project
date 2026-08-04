import api from "./api";
import type { FirewallRule } from "../types/firewall";

export const getFirewallRules = async (): Promise<FirewallRule[]> => {
  const response = await api.get("/firewall");
  return response.data;
};

export const getFirewallRule = async (
  id: number
): Promise<FirewallRule> => {
  const response = await api.get(`/firewall/${id}`);
  return response.data;
};

export const createFirewallRule = async (
  rule: Omit<FirewallRule, "id">
): Promise<FirewallRule> => {
  const response = await api.post("/firewall", rule);
  return response.data;
};

export const updateFirewallRule = async (
  id: number,
  rule: FirewallRule
): Promise<FirewallRule> => {
  const response = await api.put(`/firewall/${id}`, rule);
  return response.data;
};

export const deleteFirewallRule = async (
  id: number
): Promise<void> => {
  await api.delete(`/firewall/${id}`);
};