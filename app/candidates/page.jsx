"use client";

import { useState } from "react";
import CandidateTable from "@/components/CandidateTable";
import SearchBar from "@/components/SearchBar";
import StatusFilter from "@/components/StatusFilter";
import CandidateForm from "@/components/CandidateForm";

export default function CandidatesPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [refresh, setRefresh] = useState(false);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-end justify-between border-b border-stone-200 pb-6">
                <div>
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 mb-1">
                        Pipeline
                    </p>
                    <h1 className="font-serif text-4xl text-stone-900">Candidates</h1>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="group inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-all duration-200"
                >
                    <span className="text-lg leading-none">{showForm ? "−" : "+"}</span>
                    {showForm ? "Cancel" : "Add Candidate"}
                </button>
            </div>

            {/* Collapsible Form */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${showForm ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-5">
                        New Candidate
                    </h2>
                    <CandidateForm
                        onSuccess={() => {
                            setRefresh(!refresh);
                            setShowForm(false);
                        }}
                    />
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                    <SearchBar search={search} setSearch={setSearch} />
                </div>
                <StatusFilter status={status} setStatus={setStatus} />
            </div>

            {/* Table */}
            <CandidateTable search={search} status={status} refresh={refresh} />
        </div>
    );
}