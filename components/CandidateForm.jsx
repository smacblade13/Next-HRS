"use client";

import { useEffect, useState } from "react";
import {
    getCandidates,
    deleteCandidate,
} from "@/services/candidateService";

export default function CandidateTable({ search, status, refresh }) {
    const [data, setData] = useState([]);
    const [sort, setSort] = useState("newest");
    const [page, setPage] = useState(1);

    const LIMIT = 5;

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const fetchData = async () => {
        const { data } = await getCandidates();
        setData(data || []);
    };

    // 🔍 FILTER + SEARCH
    let filtered = data.filter((c) => {
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase());

        const matchStatus = status === "All" || c.status === status;

        return matchSearch && matchStatus;
    });

    // 🔃 SORT
    if (sort === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filtered.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
    }

    // 📄 PAGINATION
    const start = (page - 1) * LIMIT;
    const paginated = filtered.slice(start, start + LIMIT);
    const totalPages = Math.ceil(filtered.length / LIMIT);

    const handleDelete = async (id) => {
        await deleteCandidate(id);
        fetchData();
    };

    return (
        <div>
            {/* SORT */}
            <div className="mb-2">
                <select
                    className="border p-2"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="name">Name</option>
                </select>
            </div>

            {/* TABLE */}
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {paginated.map((c) => (
                        <tr key={c.id} className="text-center border-t">
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.position}</td>
                            <td>{c.status}</td>

                            <td className="space-x-2">
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    className="text-red-500"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 border ${page === i + 1 ? "bg-blue-500 text-white" : ""
                            }`}
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}