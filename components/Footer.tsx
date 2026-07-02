export default function Footer() {
  return (
    <footer className="border-t border-gold/20 px-6 py-14 text-center text-muted text-sm">
      <div className="flex justify-center items-center gap-2 font-display font-bold text-goldBright text-lg mb-3">
        <span className="w-7 h-7 rounded-full border border-gold flex items-center justify-center font-num text-sm text-gold">♛</span>
        მეფეები.ge
      </div>
      <p>ქართველ მეფეთა ისტორია — © {new Date().getFullYear()}</p>
    </footer>
  );
}
