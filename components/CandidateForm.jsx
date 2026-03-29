"use client";

import { useState } from "react";
import { addCandidate } from "@/services/candidateService";

export default function CandidateForm({ onSuccess }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        position: "",
        status: "Applied",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await addCandidate(form);

        if (!error) {
            setForm({ name: "", email: "", position: "", status: "Applied" });
            onSuccess(); // refresh table
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
            <input
                required
                placeholder="Name"
                className="border p-2"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
                required
                placeholder="Email"
                className="border p-2"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
                required
                placeholder="Position"
                className="border p-2"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
            />

            <select
                className="border p-2"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
                <option>Applied</option>
                <option>Interview</option>
                <option>Hired</option>
                <option>Rejected</option>
            </select>

            <button className="bg-blue-500 text-white px-4">
                Add
            </button>
        </form>
    );
}