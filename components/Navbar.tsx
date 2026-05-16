"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, LayoutDashboard, LogOut, Settings, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const NAV_LINKS = [
  { href: "/how-to-use", label: "How it works" },
  { href: "/pricing",    label: "Pricing" },
  { href: "/attorneys",  label: "For Attorneys" },
  { href: "/blog",       label: "Blog" },
];

export function Navbar() {
  const router = useRouter();
  const [mounted, setMounted]       = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser]             = useState<User | null>(null);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();

    // Get current session
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // Listen for auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
  const ThemeIcon = !mounted ? null : resolvedTheme === "dark" ? Sun : Moon;

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  // Get display name / initials from user
  const displayName = user?.user_metadata?.full_name || user?.email || "";
  const initials = displayName
    ? displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-nav-scroll" : "shadow-nav"
        }`}
        style={{ background: "var(--bg-nav)", backdropFilter: "blur(20px)" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="#C8F562" />
                  <rect x="2" y="7.25" width="9" height="1.5" rx="0.75" fill="#C8F562" opacity="0.7" />
                  <rect x="2" y="10.5" width="12" height="1.5" rx="0.75" fill="#C8F562" />
                </svg>
              </div>
              <span className="font-bold text-[1.0625rem] tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                Due<span className="text-forest">Visa</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              {mounted && ThemeIcon && (
                <button
                  onClick={toggleTheme}
                  title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                  className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 border"
                  style={{
                    color: "var(--text-secondary)",
                    borderColor: "var(--border-default)",
                    background: "var(--bg-card)",
                  }}
                >
                  <ThemeIcon size={15} strokeWidth={2} />
                </button>
              )}

              {/* Auth-aware section */}
              {!mounted ? null : user ? (
                /* ── Logged In ── */
                <div className="flex items-center gap-2">
                  {/* Dashboard shortcut */}
                  <Link
                    href="/dashboard"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    <LayoutDashboard size={14} />
                    Dashboard
                  </Link>

                  {/* Avatar + Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl border cursor-pointer transition-all duration-200"
                      style={{
                        borderColor: "var(--border-default)",
                        background: "var(--bg-card)",
                      }}
                    >
                      {/* Avatar circle */}
                      <div className="w-7 h-7 rounded-lg bg-forest flex items-center justify-center text-[10px] font-bold text-lime flex-shrink-0">
                        {initials}
                      </div>
                      <ChevronDown size={13} style={{ color: "var(--text-muted)" }} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown menu */}
                    {userMenuOpen && (
                      <>
                        {/* Backdrop */}
                        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                        <div
                          className="absolute right-0 top-full mt-2 w-52 rounded-2xl border py-1.5 z-50"
                          style={{
                            background: "var(--bg-card)",
                            borderColor: "var(--border-default)",
                            boxShadow: "var(--shadow-card-hover)",
                          }}
                        >
                          {/* User info */}
                          <div className="px-4 py-2.5 border-b mb-1" style={{ borderColor: "var(--border-subtle)" }}>
                            <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>{displayName}</p>
                            <p className="text-[10px] truncate mt-0.5" style={{ color: "var(--text-muted)" }}>{user.email}</p>
                          </div>
                          <Link
                            href="/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                          >
                            <LayoutDashboard size={14} /> Dashboard
                          </Link>
                          <Link
                            href="/dashboard/settings"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium transition-colors"
                            style={{ color: "var(--text-secondary)" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                          >
                            <Settings size={14} /> Settings
                          </Link>
                          <div className="border-t my-1" style={{ borderColor: "var(--border-subtle)" }} />
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium transition-colors text-left"
                            style={{ color: "var(--text-muted)" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#EF4444")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                          >
                            <LogOut size={14} /> Sign out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                /* ── Logged Out ── */
                <>
                  <Link
                    href="/login"
                    className="hidden sm:inline-flex px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="btn-primary text-sm px-4 py-2.5 cursor-pointer"
                  >
                    Start free
                  </Link>
                </>
              )}

              {/* Mobile hamburger */}
              <button
                className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-all"
                style={{ color: "var(--text-secondary)", background: "var(--bg-card)", border: "1px solid var(--border-default)" }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden border-t px-4 py-4 space-y-1"
            style={{ borderColor: "var(--border-default)", background: "var(--bg-nav)" }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
                style={{ color: "var(--text-secondary)" }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t flex gap-2" style={{ borderColor: "var(--border-default)" }}>
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="flex-1 btn-secondary text-sm text-center py-2.5 cursor-pointer flex items-center justify-center gap-1.5">
                    <LayoutDashboard size={13} /> Dashboard
                  </Link>
                  <button onClick={handleSignOut} className="flex-1 btn-ghost text-sm text-center py-2.5 cursor-pointer" style={{ color: "var(--text-muted)" }}>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 btn-secondary text-sm text-center py-2.5 cursor-pointer">
                    Sign in
                  </Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)} className="flex-1 btn-primary text-sm text-center py-2.5 cursor-pointer">
                    Start free
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
