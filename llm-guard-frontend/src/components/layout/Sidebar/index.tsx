import { navigation } from "../../../constants/navigation";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950">
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <h1 className="text-2xl font-bold text-cyan-400">
          🛡 LLM Guard
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            path={item.path}
          />
        ))}
      </nav>

      {/* Footer */}
      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;