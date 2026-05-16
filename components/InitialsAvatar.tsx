const PALETTE: [string, string][] = [
  ["#0a5c4a", "#c8f562"],
  ["#1e40af", "#bfdbfe"],
  ["#7c3aed", "#ddd6fe"],
  ["#b45309", "#fde68a"],
  ["#065f46", "#a7f3d0"],
];

function pickColor(name: string): [string, string] {
  let hash = 0;
  for (const ch of name) hash = ((hash << 5) - hash + ch.charCodeAt(0)) | 0;
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export function InitialsAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const [bg, fg] = pickColor(name);
  return (
    <div
      aria-hidden="true"
      className="flex-shrink-0 rounded-full flex items-center justify-center font-bold select-none"
      style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}
