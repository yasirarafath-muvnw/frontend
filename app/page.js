"use client";

import { useUser } from "@/context/userContext";

export default function Home() {
  const { user } = useUser();

  console.log("dfghjk.", user);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Dashboard
      </h1>
    </div>
  );
}
