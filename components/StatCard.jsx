const colorMap = {
    Total: "text-stone-900",
    Applied: "text-blue-600",
    Interview: "text-amber-600",
    Hired: "text-emerald-600",
    Rejected: "text-red-600",
};

export default function Card({ title, value }) {
    return (
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-stone-500">{title}</p>
            <h2 className={`text-2xl font-semibold mt-1 ${colorMap[title]}`}>
                {value}
            </h2>
        </div>
    );
}