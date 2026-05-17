"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "duevisa_banner_dismissed";

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== "1") {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="w-full bg-lime text-midnight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
        <div className="flex-1 text-center text-sm font-semibold leading-snug">
          🎉 Founding Member offer — Pro at $4/mo for life (first 100 signups, no expiry on the discount).{" "}
          <Link
            href="/pricing#founding-member"
            className="underline underline-offset-2 hover:no-underline font-bold whitespace-nowrap"
          >
            Lock in now →
          </Link>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss banner"
          className="flex-shrink-0 rounded-full p-1 hover:bg-midnight/10 transition-colors"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
