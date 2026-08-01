// src/components/chat/ChatLayout.tsx

import { useState } from "react";

import ChatHeader from "./ChatHeader";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import SecurityCard from "./SecurityCard";
import SuggestedPrompts from "./SuggestedPrompts";
import EmptyChat from "./EmptyChat";

import { useChat } from "../../hooks/useChat";
import {
  chatHistory,
  suggestedPrompts,
} from "../../data/chatData";

const ChatLayout = () => {
  const {
    messages,
    isTyping,
    analysis,
    sendMessage,
    clearChat,
  } = useChat();

  const [selectedChatId, setSelectedChatId] = useState(
    chatHistory[0]?.id ?? ""
  );

  const handleNewChat = () => {
    clearChat();
    setSelectedChatId(chatHistory[0]?.id ?? "");
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-950">

      {/* Sidebar */}
      <ChatSidebar
        history={chatHistory}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
        onNewChat={handleNewChat}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        <ChatHeader
          onNewChat={handleNewChat}
          onClearChat={clearChat}
        />

        <div className="flex flex-1 overflow-hidden">

          {/* Chat Section */}
          <div className="flex flex-1 flex-col">

            <div className="px-6 pt-4">
              <SuggestedPrompts
                prompts={suggestedPrompts}
                onSelectPrompt={sendMessage}
              />
            </div>

            {messages.length <= 1 ? (
              <EmptyChat />
            ) : (
              <ChatMessages
                messages={messages}
                isTyping={isTyping}
              />
            )}

            <ChatInput
              onSendMessage={sendMessage}
            />
          </div>

          {/* Security Panel */}
          <div className="hidden w-96 border-l border-gray-200 bg-white p-5 lg:block dark:border-slate-700 dark:bg-slate-900">
            <SecurityCard analysis={analysis} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatLayout;