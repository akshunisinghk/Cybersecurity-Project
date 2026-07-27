export interface FirewallRule {
  id: number;
  name: string;
  category: string;
  action: "Allow" | "Block" | "Monitor";
  status: "Active" | "Inactive";
  createdAt: string;
}