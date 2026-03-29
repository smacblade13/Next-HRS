export default function SearchBar({ search, setSearch }) {
    return (
      <input
        type="text"
        placeholder="Search name or email..."
        className="border p-2 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    );
  }