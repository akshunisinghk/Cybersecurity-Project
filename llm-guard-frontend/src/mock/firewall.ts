export interface FirewallRule {
  id: number;
  name: string;
  category: string;
  action: "Allow" | "Block" | "Monitor";
  status: "Active" | "Inactive";
}

export const firewallRules: FirewallRule[] = [
  {
    id: 1,
    name: "Prompt Injection Filter",
    category: "Injection Attack",
    action: "Block",
    status: "Active",
  },
  {
    id: 2,
    name: "Jailbreak Detection",
    category: "LLM Attack",
    action: "Block",
    status: "Active",
  },
  {
    id: 3,
    name: "Sensitive Data Monitor",
    category: "DLP",
    action: "Monitor",
    status: "Active",
  },
  {
    id: 4,
    name: "Malicious URL Detection",
    category: "Threat Detection",
    action: "Block",
    status: "Inactive",
  },
];