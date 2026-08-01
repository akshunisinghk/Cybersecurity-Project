// src/components/chat/ChatMessage.tsx

import { motion } from "framer-motion";
import { Copy, Bot, User } from "lucide-react";
import type { ChatMessage as Message } from "../../types/chat";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`mb-6 flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-3xl gap-3 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-emerald-600 text-white"
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        {/* Message */}
        <div
          className={`rounded-2xl px-4 py-3 shadow-md ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800 dark:bg-slate-800 dark:text-gray-100"
          }`}
        >
          <p className="whitespace-pre-wrap leading-relaxed">
            {message.content}
          </p>

          <div className="mt-3 flex items-center justify-between gap-4">
            <span
              className={`text-xs ${
                isUser ? "text-blue-100" : "text-gray-500"
              }`}
            >
              {message.timestamp}
            </span>

            <button
              onClick={handleCopy}
              className="rounded p-1 transition hover:bg-black/10 dark:hover:bg-white/10"
              title="Copy"
            >
              <Copy size={15} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;