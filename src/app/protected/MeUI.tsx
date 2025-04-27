"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MePage = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const router = useRouter()
  const handleMe = async () => {
    try {
      const res = await fetch("/api/me", {
        method: "GET",
        headers: { "Content-Type": "application/json" },

      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Not authenticated");
        return;
      }
     
      setUser(data);
      setError("");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    handleMe();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Not authenticated");
        return;
      }
      setError("");
      alert(data.message)
      router.push('/')
    } catch (err) {
      setError("Something went wrong");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md text-black">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}</h1>
        <p>Email: {user.email}</p>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
      </div>
      <button onClick={handleLogout} className="w-[200px] rounded-full bg-red-500 text-white py-2  transition">Log out</button>

    </div>
  );
};

export default MePage;
