export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <span className="w-10 h-10 rounded-full border-2 border-gold/25 border-t-goldBright animate-spin" />
      <span className="font-num text-xs tracking-widest uppercase text-muted">
        იტვირთება…
      </span>
    </div>
  );
}

