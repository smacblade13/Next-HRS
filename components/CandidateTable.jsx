"use client";

import { useEffect, useState } from "react";
import { getCandidates } from "@/services/candidateService";

export default function CandidateTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await getCandidates();
    setData(data || []);
  };

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th>Name</th>
          <th>Email</th>
          <th>Position</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((c) => (
          <tr key={c.id} className="text-center border-t">
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.position}</td>
            <td>{c.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}