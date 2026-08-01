import { Bot, Plus, Trash2, Wifi } from "lucide-react";

interface ChatHeaderProps {
  onNewChat: () => void;
  onClearChat: () => void;
}

const ChatHeader = ({
  onNewChat,
  onClearChat,
}: ChatHeaderProps) => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-slate-700 dark:bg-slate-900">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-blue-600 p-2 text-white">
          <Bot size={22} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            AI Security Assistant
          </h1>

          <div className="mt-1 flex items-center gap-2">
            <Wifi
              size={14}
              className="text-green-500"
            />

            <span className="text-sm text-green-600">
              Connected
            </span>

            <span className="text-sm text-gray-400">
              • GPT-4
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex gap-3">
        <button
          onClick={onNewChat}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Chat
        </button>

        <button
          onClick={onClearChat}
          className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
        >
          <Trash2 size={18} />
          Clear
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;