import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center">
      {/* Hero Section */}
      <div className="max-w-3xl">
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-amber-600 mb-6 border border-amber-200 bg-amber-50 px-3 py-1 rounded-full">
          Recruitment Platform
        </span>

        <h1 className="font-serif text-6xl md:text-7xl font-normal leading-[1.05] text-stone-900 mb-6">
          Find the right
          <br />
          <span className="italic text-stone-400">people,</span> faster.
        </h1>

        <p className="text-stone-500 text-lg font-light leading-relaxed max-w-xl mb-10">
          Streamline your hiring pipeline. Track candidates, manage interviews,
          and make better decisions — all in one place.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/candidates"
            className="group inline-flex items-center gap-3 bg-stone-900 text-white px-7 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-stone-700 transition-all duration-200"
          >
            View Candidates
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <Link
            href="/candidates"
            className="inline-flex items-center gap-2 text-stone-500 text-sm font-medium hover:text-stone-900 transition-colors duration-200"
          >
            <span className="w-8 h-px bg-stone-300 inline-block" />
            Learn more
          </Link>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="mt-20 pt-10 border-t border-stone-200 grid grid-cols-3 gap-8 max-w-lg">
        {[
          { value: "98%", label: "Placement rate" },
          { value: "2×", label: "Faster hiring" },
          { value: "500+", label: "Active roles" },
        ].map(({ value, label }) => (
          <div key={label}>
            <div className="font-serif text-3xl text-stone-900">{value}</div>
            <div className="text-xs text-stone-400 uppercase tracking-widest mt-1">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}