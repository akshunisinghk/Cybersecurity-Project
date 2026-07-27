export interface Model {
  id: number;
  name: string;
  provider: string;
  version: string;
  status: "Online" | "Offline";
}