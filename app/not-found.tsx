// /app/not-found.tsx
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-page)" }}>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="font-mono text-8xl font-bold text-lime/20 mb-6">404</div>
        <h1 className="font-display text-4xl font-bold text-white mb-4">Page not found</h1>
        <p className="text-sage text-lg mb-8">
          This page doesn&apos;t exist — but your immigration deadlines do.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/" className="btn-primary">
            Back to home
          </Link>
          <Link href="/dashboard" className="btn-secondary">
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
