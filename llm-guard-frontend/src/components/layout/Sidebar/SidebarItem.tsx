import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  title: string;
  icon: React.ElementType;
  path: string;
}

const SidebarItem = ({
  title,
  icon: Icon,
  path,
}: SidebarItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
          isActive
            ? "bg-cyan-600 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        }`
      }
    >
      <Icon size={20} />
      <span>{title}</span>
    </NavLink>
  );
};

export default SidebarItem;