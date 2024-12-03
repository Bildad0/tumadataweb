"use client"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [status, setStatus] = useState("");
  const router = useRouter();
  const [backups, setBackups] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login"); // Redirect to login if not authenticated
    }
    try {
      fetch(`${process.env.API_URL}/backup/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((data) => {
        const backup = data.json();
        setBackups(backup);
      });
    } catch (error) {
      setStatus("Error fetching backups");
    }
  }, [router]);

  console.log(backups);

  const backupData = async (type: string) => {
    setStatus("Processing...");
    try {
      const response = await fetch(`${process.env.API_URL}/backup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const result = await response.json();
      setStatus(result.message);
    } catch (error) {
      setStatus("Backup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Backup Dashboard
      </h1>
      <div className="space-x-4">
        <button
          onClick={() => backupData("manual")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Backup Manually
        </button>
        <button
          onClick={() => backupData("automatic")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Enable Automatic Backup
        </button>
      </div>
      {status && <p className="mt-6 text-gray-600">{status}</p>}
    </div>
  );
}
