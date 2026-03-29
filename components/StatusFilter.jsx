export default function StatusFilter({ status, setStatus }) {
    return (
        <select
            className="border p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
        >
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
        </select>
    );
}