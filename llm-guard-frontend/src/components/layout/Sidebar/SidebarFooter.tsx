import { ShieldCheck } from "lucide-react";

const SidebarFooter = () => {
  return (
    <div className="border-t border-slate-800 p-4">
      <div className="flex items-center gap-2 text-cyan-400">
        <ShieldCheck size={20} />
        <span className="text-sm">LLM Guard v1.0</span>
      </div>
    </div>
  );
};

export default SidebarFooter;