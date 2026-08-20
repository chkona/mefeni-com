"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { createClient } from "@/lib/supabase/client";

// ნავიგაციის ბმულების სია — ახალი გვერდის დასამატებლად უბრალოდ
// დაამატე ახალი ობიექტი ამ მასივში.
const LINKS = [
  { href: "/", label: "მთავარი" },
  { href: "/kings", label: "მეფეები" },
  { href: "/dynasties", label: "დინასტიები" },
  { href: "/timeline", label: "ქრონოლოგია" },
  { href: "/heroes", label: "გმირები" },
  { href: "/works", label: "ნაშრომები" },
  { href: "/abiturientebi", label: "აბიტურიენტები" },
  { href: "/game", label: "თამაში" },
  { href: "/about", label: "ჩვენს შესახებ" },
];

type SimpleUser = {
  email: string | null;
  displayName: string | null;
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!mounted) return;
      if (user) {
        setUser({
          email: user.email ?? null,
          displayName:
            (user.user_metadata?.full_name as string | undefined) ??
            (user.user_metadata?.name as string | undefined) ??
            null,
        });
      } else {
        setUser(null);
      }
      setLoadingUser(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          email: session.user.email ?? null,
          displayName:
            (session.user.user_metadata?.full_name as string | undefined) ??
            (session.user.user_metadata?.name as string | undefined) ??
            null,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setOpen(false);
    router.refresh();
    router.push("/");
  }

  const label = user?.displayName || user?.email || null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-void/70 backdrop-blur-xl border-b border-gold/20">
      <Link href="/" className="flex items-center gap-2 font-display font-black text-goldBright text-xl">
        <span className="w-7 h-7 rounded-full border border-gold flex items-center justify-center font-num text-sm text-gold">♛</span>
        მეფენი.GE
      </Link>

      <div className="hidden md:flex gap-7 text-sm">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="opacity-80 hover:opacity-100 hover:text-goldBright transition">
            {l.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        {!loadingUser && (
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-goldBright max-w-[140px] truncate">{label}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm opacity-80 hover:opacity-100 hover:text-goldBright transition"
                >
                  გამოსვლა
                </button>
              </>
            ) : (
              <Link href="/login" className="text-sm opacity-80 hover:opacity-100 hover:text-goldBright transition">
                შესვლა
              </Link>
            )}
          </div>
        )}

        <button className="md:hidden text-gold text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 flex flex-col gap-4 bg-void/95 border-b border-gold/20 p-6 md:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}

          {!loadingUser && (
            <>
              {user ? (
                <>
                  <span className="text-sm text-goldBright">{label}</span>
                  <button onClick={handleLogout} className="text-left">
                    გამოსვლა
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)}>
                  შესვლა
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
}