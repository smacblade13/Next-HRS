export default function StatusFilter({ status, setStatus }) {
  return (
    <select
      className="min-w-[140px] bg-white border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition-all duration-150"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="All">All statuses</option>
      <option value="Applied">Applied</option>
      <option value="Interview">Interview</option>
      <option value="Hired">Hired</option>
      <option value="Rejected">Rejected</option>
    </select>
  );
}