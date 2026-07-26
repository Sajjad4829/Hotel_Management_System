import { Minus, Plus } from "lucide-react";

export default function RoomCounter({ count, max, onDecrement, onIncrement }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onDecrement}
        disabled={count === 0}
        className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200
                   disabled:opacity-30 disabled:cursor-not-allowed
                   border-[#1a3c5e] text-[#1a3c5e] hover:bg-[#1a3c5e] hover:text-white active:scale-95"
        aria-label="Decrease room count"
      >
        <Minus size={14} strokeWidth={2.5} />
      </button>

      <span className="w-6 text-center text-[16px] font-bold text-[#1a3c5e] tabular-nums select-none">
        {count}
      </span>

      <button
        onClick={onIncrement}
        disabled={count >= max}
        className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200
                   disabled:opacity-30 disabled:cursor-not-allowed
                   border-[#1a3c5e] text-[#1a3c5e] hover:bg-[#1a3c5e] hover:text-white active:scale-95"
        aria-label="Increase room count"
      >
        <Plus size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}