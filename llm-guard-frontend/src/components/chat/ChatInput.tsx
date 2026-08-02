// src/components/chat/ChatInput.tsx

import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Send, Paperclip, Mic } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSendMessage(message.trim());
    setMessage("");
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-end gap-3 rounded-xl border border-gray-300 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">

        {/* Attach Button */}
        <button
          className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-slate-700"
          title="Attach File"
        >
          <Paperclip size={20} />
        </button>

        {/* Text Area */}
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="max-h-40 flex-1 resize-none bg-transparent outline-none"
        />

        {/* Microphone */}
        <button
          className="rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-slate-700"
          title="Voice Input"
        >
          <Mic size={20} />
        </button>

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <Send size={20} />
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-gray-500">
        Press <strong>Enter</strong> to send • <strong>Shift + Enter</strong> for a new line
      </p>
    </div>
  );
};

export default ChatInput;