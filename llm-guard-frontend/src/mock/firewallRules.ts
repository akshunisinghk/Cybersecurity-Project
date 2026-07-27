export interface FirewallRule {
  id: number;
  name: string;
  type: string;
  action: "Allow" | "Block" | "Flag";
  status: "Enabled" | "Disabled";
}

export const firewallRules: FirewallRule[] = [
  {
    id: 1,
    name: "Prompt Injection Protection",
    type: "Prompt",
    action: "Block",
    status: "Enabled",
  },
  {
    id: 2,
    name: "Sensitive Data Detection",
    type: "DLP",
    action: "Flag",
    status: "Enabled",
  },
  {
    id: 3,
    name: "SQL Injection Filter",
    type: "Input",
    action: "Block",
    status: "Enabled",
  },
  {
    id: 4,
    name: "Jailbreak Detection",
    type: "Prompt",
    action: "Block",
    status: "Disabled",
  },
];