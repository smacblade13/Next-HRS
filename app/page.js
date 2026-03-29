import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Recruitment System</h1>

      <Link href="/candidates" className="text-blue-500 underline">
        Go to Candidates
      </Link>
    </div>
  );
}