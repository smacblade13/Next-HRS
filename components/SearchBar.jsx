export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search name or email…"
      className="w-full bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition-all duration-150"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}