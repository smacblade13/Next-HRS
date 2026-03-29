"use client";

import { useState } from "react";
import { addCandidate } from "@/services/candidateService";
import toast from "react-hot-toast";

const statusOptions = ["Applied", "Interview", "Hired", "Rejected"];

const statusColors = {
    Applied: "bg-blue-50 text-blue-700 border-blue-200",
    Interview: "bg-amber-50 text-amber-700 border-amber-200",
    Hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
};

export default function CandidateForm({ onSuccess }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        position: "",
        status: "Applied",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await addCandidate(form);

        if (!error) {
            toast.success("Candidate added 🎉");
            setForm({ name: "", email: "", position: "", status: "Applied" });
            onSuccess();
        } else {
            toast.error("Something went wrong");
            setError("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    const inputClass =
        "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition-all duration-150";

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                        Full Name
                    </label>
                    <input
                        required
                        placeholder="Jane Smith"
                        className={inputClass}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                        Email
                    </label>
                    <input
                        required
                        type="email"
                        placeholder="jane@example.com"
                        className={inputClass}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                        Position
                    </label>
                    <input
                        required
                        placeholder="Senior Designer"
                        className={inputClass}
                        value={form.position}
                        onChange={(e) => setForm({ ...form, position: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex items-end gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                        Status
                    </label>
                    <div className="flex gap-2">
                        {statusOptions.map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setForm({ ...form, status: s })}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${form.status === s
                                    ? statusColors[s]
                                    : "bg-transparent text-stone-400 border-stone-200 hover:border-stone-300"
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-3">
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                        {loading ? (
                            <>
                                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Saving…
                            </>
                        ) : (
                            "Add Candidate"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}