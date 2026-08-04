export interface FirewallRule {
  id: number;
  name: string;
  type: string;
  action: "Allow" | "Block" | "Flag";
  status: "Enabled" | "Disabled";
}