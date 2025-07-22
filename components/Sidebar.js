import React from "react";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg border-l z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-lg font-semibold text-black">Sidebar</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-xl">
          ✕
        </button>
      </div>
      <ul className="px-4 py-6 space-y-3 text-gray-700">
        <li className="hover:text-blue-600 cursor-pointer">Profile</li>
        <li className="hover:text-blue-600 cursor-pointer">Task</li>
        <li className="hover:text-blue-600 cursor-pointer">Project</li>
        <li className="hover:text-blue-600 cursor-pointer">Logout</li>
      </ul>
    </div>
  );
}
