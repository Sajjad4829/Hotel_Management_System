import React from "react";
import { QUICK_QUESTIONS } from "./AIResponses";

export default function QuickQuestions({ onSelect }) {
  return (
    <div className="px-4 pb-3 pt-1">
      <p className="text-[11px] uppercase tracking-wider text-[#2C4A6E]/50 font-semibold mb-2 px-1">
        Suggested for you
      </p>
      <div className="flex flex-wrap gap-2">
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q.label}
            onClick={() => onSelect(q.query)}
            className="text-xs font-medium px-3 py-1.5 rounded-full
              bg-white/70 border border-[#2C4A6E]/15 text-[#2C4A6E]
              hover:bg-[#2C4A6E] hover:text-white hover:border-[#2C4A6E]
              transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {q.label}
          </button>
        ))}
      </div>
    </div>
  );
}