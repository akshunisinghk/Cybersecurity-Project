import { MessageSquare, Plus } from "lucide-react";
import type { ChatHistory } from "../../types/chat";

interface ChatSidebarProps {
  history: ChatHistory[];
  selectedChatId?: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

const ChatSidebar = ({
  history,
  selectedChatId,
  onSelectChat,
  onNewChat,
}: ChatSidebarProps) => {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 dark:border-slate-700">
        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-3">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Recent Chats
        </h3>

        <div className="space-y-2">
          {history.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full rounded-lg p-3 text-left transition ${
                selectedChatId === chat.id
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                  : "hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-start gap-3">
                <MessageSquare
                  size={18}
                  className="mt-0.5 flex-shrink-0"
                />

                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {chat.title}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {chat.createdAt}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;