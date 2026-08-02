// src/components/chat/EmptyChat.tsx

import { Bot, ShieldCheck } from "lucide-react";

const EmptyChat = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-slate-800">
        <Bot className="h-10 w-10 text-blue-600" />
      </div>

      {/* Title */}
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
        AI Security Assistant
      </h2>

      {/* Description */}
      <p className="max-w-lg text-gray-600 dark:text-gray-400">
        Welcome to LLM-Guard. Start a secure AI conversation to analyze prompts,
        learn cybersecurity concepts, and test prompt security.
      </p>

      {/* Info Card */}
      <div className="mt-8 max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-3 flex items-center justify-center gap-2">
          <ShieldCheck className="text-green-600" />
          <span className="font-semibold">
            Secure Prompt Analysis
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Every prompt is analyzed for potential threats such as prompt
          injection, sensitive data exposure, and malicious instructions.
        </p>
      </div>
    </div>
  );
};

export default EmptyChat;