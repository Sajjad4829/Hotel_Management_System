import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[#eef2f6] to-[#e4e9f0]">
      {/* shimmer sweep */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-[#2C4A6E]/15" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#C9A24B] animate-spin" />
        </div>
        <p className="text-[#2C4A6E]/60 text-sm font-medium tracking-wide">
          Loading 360° experience…
        </p>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}