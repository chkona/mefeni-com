"use client";
import Link from "next/link";
import { useState } from "react";

// ნავიგაციის ბმულების სია — ახალი გვერდის დასამატებლად უბრალოდ
// დაამატე ახალი ობიექტი ამ მასივში.
const LINKS = [
  { href: "/", label: "მთავარი" },
  { href: "/kings", label: "მეფეები" },
  { href: "/dynasties", label: "დინასტიები" },
  { href: "/battles", label: "ბრძოლები" },
  { href: "/timeline", label: "ქრონოლოგია" },
  { href: "/maps", label: "რუკები" },
  { href: "/churches", label: "ეკლესიები" },
  { href: "/heroes", label: "გმირები" },
  { href: "/abiturientebi", label: "აბიტურიენტები" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-void/70 backdrop-blur-xl border-b border-gold/20">
      <Link href="/" className="flex items-center gap-2 font-display font-black text-goldBright text-xl">
        <span className="w-7 h-7 rounded-full border border-gold flex items-center justify-center font-num text-sm text-gold">♛</span>
        მეფენი.ge
      </Link>

      <div className="hidden md:flex gap-7 text-sm">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="opacity-80 hover:opacity-100 hover:text-goldBright transition">
            {l.label}
          </Link>
        ))}
      </div>

      <button className="md:hidden text-gold text-2xl" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 flex flex-col gap-4 bg-void/95 border-b border-gold/20 p-6 md:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

