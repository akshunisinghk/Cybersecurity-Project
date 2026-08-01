// src/components/chat/TypingIndicator.tsx

import { motion } from "framer-motion";

const bounceTransition = {
  repeat: Infinity,
  repeatType: "reverse" as const,
  duration: 0.4,
};

const TypingIndicator = () => {
  return (
    <div className="flex items-end gap-3 py-4">
      {/* AI Avatar */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
        AI
      </div>

      {/* Typing Bubble */}
      <div className="rounded-2xl bg-gray-100 px-4 py-3 shadow dark:bg-slate-800">
        <div className="flex gap-2">
          <motion.span
            className="h-2 w-2 rounded-full bg-gray-500"
            animate={{ y: [-2, 2] }}
            transition={{ ...bounceTransition, delay: 0 }}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-gray-500"
            animate={{ y: [-2, 2] }}
            transition={{ ...bounceTransition, delay: 0.15 }}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-gray-500"
            animate={{ y: [-2, 2] }}
            transition={{ ...bounceTransition, delay: 0.3 }}
          />
        </div>

        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          AI is typing...
        </p>
      </div>
    </div>
  );
};

export default TypingIndicator;