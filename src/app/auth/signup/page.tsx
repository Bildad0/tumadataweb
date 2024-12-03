"use client"

import { useState } from "react";
import { useRouter} from 'next/navigation'

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("")
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignup = async (e: any) => {
        e.preventDefault();
        setError("");
console.log();
        try {
            const response = await fetch(`${process.env.API_URL}auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, phone, username }),
            });
            const data = await response.json();

            if (response.ok) {
                router.push("/auth/login"); // Redirect to login
            } else {
                setError(data.message || "Signup failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Signup</h1>
            <form onSubmit={handleSignup} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-4 py-2 border rounded-lg"
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full px-4 py-2 border rounded-lg"
                    required
                />
                  <input
                    type="text"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full px-4 py-2 border rounded-lg"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 border rounded-lg"
                    required
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Signup
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
}
