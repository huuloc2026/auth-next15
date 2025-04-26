'use client';
import api from '@/lib/axios';
import {  useRouter } from 'next/navigation'
import React, { useState } from "react";

const LoginUI = () => {
  const router = useRouter();
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // await api.post('/auth/login', { username, password });


        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
  
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      alert("Login successful!");
      setError("");
      router.push('/protected');  
      
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleLogin}
        className="bg-blue-100 p-6 rounded shadow-md w-full max-w-sm text-black"
      >
        <h2 className="text-2xl text-white-500 font-semibold mb-4">Login</h2>

        {error && <p className="text-white-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-black py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginUI;
