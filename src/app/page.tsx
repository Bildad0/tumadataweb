import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Cloud Backup App
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Backup your data securely and effortlessly to the cloud.
      </p>
      <Link href="/dashboard">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Get Started
        </button>
      </Link>
    </div>
  );
}
