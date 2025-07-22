"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-black">Dashboard</h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-lg px-4 py-2 bg-gray-800 text-white rounded"
        >
          Open Sidebar
        </button>
      </header>

      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-black">Welcome!</h2>
        <p className="text-black">Your dashboard content goes here.</p>
      </main>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}
