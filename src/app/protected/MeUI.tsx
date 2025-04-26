"use client";
import React, { useEffect, useState } from "react";

const MePage = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md text-black">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}</h1>
        <p>Email: {user.email}</p>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>

      </div>
    </div>
  );
};

export default MePage;
