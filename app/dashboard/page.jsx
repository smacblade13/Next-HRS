"use client";

import { useEffect, useState } from "react";
import { getCandidates } from "@/services/candidateService";
import Card from "@/components/StatCard";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await getCandidates();
    setData(data || []);
  };

  // 📊 STATS
  const total = data.length;

  const applied = data.filter((c) => c.status === "Applied").length;
  const interview = data.filter((c) => c.status === "Interview").length;
  const hired = data.filter((c) => c.status === "Hired").length;
  const rejected = data.filter((c) => c.status === "Rejected").length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-stone-800">Dashboard</h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card title="Total" value={total} />
        <Card title="Applied" value={applied} />
        <Card title="Interview" value={interview} />
        <Card title="Hired" value={hired} />
        <Card title="Rejected" value={rejected} />
      </div>
    </div>
  );
}