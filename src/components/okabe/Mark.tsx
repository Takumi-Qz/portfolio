/** 社章：図面の中心線マーク（円と十字） */
export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none" stroke="currentColor">
      <circle cx="16" cy="16" r="10.5" strokeWidth="2.2" />
      <path d="M16 1v8M16 23v8M1 16h8M23 16h8" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
