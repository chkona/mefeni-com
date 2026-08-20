import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  email: string | null;
  role: "user" | "editor" | "admin";
};

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, role")
    .eq("id", user.id)
    .single();

  return profile as Profile | null;
}

export async function isEditor(): Promise<boolean> {
  const profile = await getCurrentProfile();
  return profile?.role === "editor" || profile?.role === "admin";
}
