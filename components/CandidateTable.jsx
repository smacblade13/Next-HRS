"use client";

import { useEffect, useState } from "react";
import {
  getCandidates,
  deleteCandidate,
  updateCandidate,
} from "@/services/candidateService";

export default function CandidateTable({ search, status, refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    const { data } = await getCandidates();
    setData(data || []);
  };

  // 🔍 filter
  let filtered = data.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus = status === "All" || c.status === status;

    return matchSearch && matchStatus;
  });

  const handleDelete = async (id) => {
    await deleteCandidate(id);
    fetchData();
  };

  const handleEdit = async (id) => {
    const name = prompt("New name:");
    if (!name) return;

    await updateCandidate(id, { name });
    fetchData();
  };

  return (
    <table className="w-full border mt-4">
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
        {filtered.map((c) => (
          <tr key={c.id} className="text-center border-t">
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.position}</td>
            <td>{c.status}</td>

            <td className="space-x-2">
              <button
                onClick={() => handleEdit(c.id)}
                className="text-blue-500"
              >
                Edit
              </button>

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
  );
}