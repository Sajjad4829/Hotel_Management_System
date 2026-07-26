import { ChevronLeft, ChevronRight } from "lucide-react";

/* ─── EMPTY STATE ───────────────────────────────────────── */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white rounded-2xl border border-slate-100 shadow-sm">
      {/* Illustration placeholder */}
      <div className="w-28 h-28 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center mb-6">
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <rect x="8" y="18" width="36" height="26" rx="3" stroke="#94a3b8" strokeWidth="2" />
          <path d="M8 24h36" stroke="#94a3b8" strokeWidth="2" />
          <path d="M18 12l8-6 8 6" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          <rect x="20" y="30" width="12" height="14" rx="2" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="8" fill="#f1f5f9" stroke="#2C4A6E" strokeWidth="1.5" />
          <path d="M37 40h6M43 40l-2-2M43 40l-2 2" stroke="#2C4A6E" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="text-[19px] font-bold text-[#1E2A38] mb-2">No Hotels Found</h3>
      <p className="text-[14px] text-slate-500 max-w-sm leading-relaxed">
        Try changing your filters or search another destination — we have thousands of properties worldwide.
      </p>
    </div>
  );
}

/* ─── LOADING SKELETON ──────────────────────────────────── */
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col sm:flex-row animate-pulse">
    <div className="sm:w-64 md:w-72 flex-shrink-0 bg-slate-100 h-52 sm:h-auto" />
    <div className="flex-1 p-5 flex flex-col gap-3">
      <div className="flex justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-slate-100 rounded-full w-1/4" />
          <div className="h-5 bg-slate-100 rounded-full w-3/4" />
          <div className="h-3 bg-slate-100 rounded-full w-1/3" />
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex-shrink-0" />
      </div>
      <div className="h-3 bg-slate-100 rounded-full w-1/4" />
      <div className="flex gap-2">
        <div className="h-5 bg-slate-100 rounded-full w-28" />
        <div className="h-5 bg-slate-100 rounded-full w-28" />
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-5 bg-slate-100 rounded-full w-16" />
        ))}
      </div>
      <div className="mt-auto pt-3 border-t border-slate-50 flex justify-between items-end">
        <div className="space-y-1.5">
          <div className="h-3 bg-slate-100 rounded-full w-16" />
          <div className="h-7 bg-slate-100 rounded-full w-24" />
        </div>
        <div className="h-10 bg-slate-100 rounded-xl w-36" />
      </div>
    </div>
  </div>
);

export function LoadingSkeleton({ count = 4 }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/* ─── PAGINATION ────────────────────────────────────────── */
export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1);

  const btnBase =
    "w-9 h-9 rounded-xl text-[13px] font-semibold transition-all duration-200 flex items-center justify-center";

  return (
    <div className="flex items-center justify-center gap-1.5 pt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <ChevronLeft size={15} />
      </button>

      {visible.map((page, idx) => {
        const prev = visible[idx - 1];
        const showDots = prev && page - prev > 1;
        return (
          <span key={page} className="flex items-center gap-1.5">
            {showDots && (
              <span className="w-9 h-9 flex items-center justify-center text-slate-400 text-[13px]">…</span>
            )}
            <button
              onClick={() => onPageChange(page)}
              className={`${btnBase} ${
                page === currentPage
                  ? "bg-[#2C4A6E] text-white shadow-md shadow-[#2C4A6E]/30"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}