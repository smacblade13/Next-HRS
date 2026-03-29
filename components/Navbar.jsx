import Link from "next/link";

const linkClass =
  "text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors duration-200";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8">
        <Link
          href="/"
          className="font-serif text-lg text-stone-900 tracking-tight"
        >
          HR Sys
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className={linkClass}>
            Home
          </Link>
          <Link href="/candidates" className={linkClass}>
            Candidates
          </Link>
          <Link href="/dashboard" className={linkClass}>
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}