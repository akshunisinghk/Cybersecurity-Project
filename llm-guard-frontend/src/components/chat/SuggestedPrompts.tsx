// src/components/chat/SuggestedPrompts.tsx

import type { SuggestedPrompt } from "../../types/chat";

interface SuggestedPromptsProps {
  prompts: SuggestedPrompt[];
  onSelectPrompt: (prompt: string) => void;
}

const SuggestedPrompts = ({
  prompts,
  onSelectPrompt,
}: SuggestedPromptsProps) => {
  return (
    <div className="mb-4">
      <h3 className="mb-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
        Suggested Prompts
      </h3>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {prompts.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectPrompt(item.prompt)}
            className="min-w-fit rounded-lg border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-all hover:border-blue-500 hover:bg-blue-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <p className="font-medium text-gray-900 dark:text-white">
              {item.title}
            </p>

            <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
              {item.prompt}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;