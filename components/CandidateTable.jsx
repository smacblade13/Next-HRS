"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  getCandidates,
  deleteCandidate,
  updateCandidate,
} from "@/services/candidateService";

const statusBadge = {
  Applied: "bg-blue-50 text-blue-800 ring-blue-200",
  Interview: "bg-amber-50 text-amber-800 ring-amber-200",
  Hired: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  Rejected: "bg-red-50 text-red-800 ring-red-200",
};

const inputEdit =
  "w-full min-w-0 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300";

export default function CandidateTable({ search, status, refresh }) {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const LIMIT = 3;

  useEffect(() => {
    fetchData();
  }, [refresh]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const fetchData = async () => {
    const { data } = await getCandidates();
    setData(data || []);
  };

  // 🔍 SEARCH + FILTER
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
  const totalPages = Math.ceil(filtered.length / LIMIT);
  const start = (page - 1) * LIMIT;
  const paginated = filtered.slice(start, start + LIMIT);

  // ❌ DELETE
  const handleDelete = async (id) => {
    const promise = deleteCandidate(id);

    toast.promise(promise, {
      loading: "Deleting...",
      success: "Candidate deleted",
      error: "Failed to delete",
    });

    await promise;
    fetchData();
  };

  // ✏️ START EDIT
  const startEdit = (candidate) => {
    setEditingId(candidate.id);
    setEditForm(candidate);
  };

  // 💾 SAVE EDIT
  const handleSave = async () => {
    await updateCandidate(editingId, {
      name: editForm.name,
      email: editForm.email,
      position: editForm.position,
      status: editForm.status,
    });
    toast.success("Candidate updated");
    setEditingId(null);
    fetchData();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
          {filtered.length} candidate{filtered.length !== 1 ? "s" : ""}
        </p>
        <select
          className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Sort: Newest</option>
          <option value="name">Sort: Name</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/80">
                <th className="px-4 py-3 font-semibold text-stone-600">
                  Name
                </th>
                <th className="px-4 py-3 font-semibold text-stone-600">
                  Email
                </th>
                <th className="px-4 py-3 font-semibold text-stone-600">
                  Position
                </th>
                <th className="px-4 py-3 font-semibold text-stone-600">
                  Status
                </th>
                <th className="px-4 py-3 font-semibold text-stone-600 text-right w-[1%] whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-stone-500"
                  >
                    No candidates match your filters.
                  </td>
                </tr>
              ) : (
                paginated.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-stone-50/60 transition-colors"
                  >
                    {editingId === c.id ? (
                      <>
                        <td className="px-4 py-3 align-middle">
                          <input
                            className={inputEdit}
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                          />
                        </td>
                        <td className="px-4 py-3 align-middle">
                          <input
                            className={inputEdit}
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                email: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td className="px-4 py-3 align-middle">
                          <input
                            className={inputEdit}
                            value={editForm.position}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                position: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td className="px-4 py-3 align-middle">
                          <select
                            className={`${inputEdit} max-w-[140px]`}
                            value={editForm.status}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                status: e.target.value,
                              })
                            }
                          >
                            <option>Applied</option>
                            <option>Interview</option>
                            <option>Hired</option>
                            <option>Rejected</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 align-middle text-right">
                          <button
                            type="button"
                            onClick={handleSave}
                            className="rounded-full bg-stone-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-stone-700 transition-colors"
                          >
                            Save
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 font-medium text-stone-900">
                          {c.name}
                        </td>
                        <td className="px-4 py-3 text-stone-600">{c.email}</td>
                        <td className="px-4 py-3 text-stone-700">
                          {c.position}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${statusBadge[c.status] ?? "bg-stone-100 text-stone-700 ring-stone-200"}`}
                          >
                            {c.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => startEdit(c)}
                              className="text-xs font-medium text-stone-600 hover:text-stone-900 underline-offset-2 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(c.id)}
                              className="text-xs font-medium text-red-600 hover:text-red-800 underline-offset-2 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-stone-400 mr-1">Page</span>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i + 1)}
              className={`min-w-[2.25rem] rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${page === i + 1
                ? "bg-stone-900 text-white"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}