"use client";

import { useState } from "react";
import CandidateTable from "@/components/CandidateTable";
import SearchBar from "@/components/SearchBar";
import StatusFilter from "@/components/StatusFilter";
import CandidateForm from "@/components/CandidateForm";

export default function CandidatesPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [refresh, setRefresh] = useState(false); // trigger reload

    return (
        <div className="space-y-4">
            <h1 className="text-xl font-bold">Candidates</h1>

            <CandidateForm onSuccess={() => setRefresh(!refresh)} />

            <div className="flex gap-4">
                <SearchBar search={search} setSearch={setSearch} />
                <StatusFilter status={status} setStatus={setStatus} />
            </div>

            <CandidateTable
                search={search}
                status={status}
                refresh={refresh}
            />
        </div>
    );
}