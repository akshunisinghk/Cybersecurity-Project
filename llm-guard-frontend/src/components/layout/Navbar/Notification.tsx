import { Bell } from "lucide-react";

const Notification = () => {
  return (
    <button className="rounded-lg p-2 hover:bg-slate-800 transition">
      <Bell className="text-white" size={22} />
    </button>
  );
};

export default Notification;